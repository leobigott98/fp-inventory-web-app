import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc, setDoc, getDocs, getDoc, query, orderBy, increment, where} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getApp } from "firebase/app";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx"; 
import serial from "../../pages/category/[pid]/[phid]/serial";

const db = getFirestore(getApp);
const auth = getAuth();

//Add a new product
export const newCategory = async (event, callback) => {
  event.preventDefault();
  const data = {
    name: event.target.name.value,
    created_by: doc(db, "users", auth.currentUser.uid),
    created_by_email: auth.currentUser.email,
    date_created: serverTimestamp(),
    number_of_elements: 0,
    active: true,
  };

  await addDoc(collection(db, "categories"), data);

  callback()
};

//Add a new Location
export const newLocation = async (event, callback) => {
  event.preventDefault();

  const data = {
    name: event.target.location.value,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
    active: true,
  };

  await addDoc(collection(db, "locations"), data);

  callback()
};

//Add a new Item within a product subcollection
export const newItem = async (event, category, checked, callback) => {
  event.preventDefault();

  const data = {
    created_by: doc(db, "users", auth.currentUser.uid),
    created_by_email: auth.currentUser.email,
    name: event.target.name.value,
    date_created: serverTimestamp(),
    location: event.target.location.value,
    comments: event.target.comments.value,
    number_of_elements: Number(event.target.qty.value),
    units_of_measurement: event.target.unit.value,
    specs: event.target.specs.value,
    active: true,
    serials: checked
  };

  await addDoc(doc(db, "categories", category, "items"), data);

  callback()
};

export const newSerial = async (event, category, item, callback) => {
  event.preventDefault();

  const serial = event.target.serial.value

  const data = {
    created_by: doc(db, "users", auth.currentUser.uid),
    created_by_email: auth.currentUser.email,
    serial: serial.toUpperCase(),
    date_created: serverTimestamp(),
    status: 'disponible',
    assigned_to: '',
    received_from: '',
    comments: null
  };

  if(event.target.comments.value != null){
    data.comments = event.target.comments.value;
  }

  await setDoc(doc(db, "categories", category, "items", item, "serials", data.serial), data);

  callback()
};

/* export const assignSerial = async (event, category, item, serial, callback) => {
  event.preventDefault();

  const data = {
    assigned_by: doc(db, "users", auth.currentUser.uid),
    assigned_by_user: auth.currentUser.email,
    timestamp: serverTimestamp(),
    action: event.target.action.value,
    assigned_to: null,
    status: null,
    location: event.target.location.value,
  };

  if(data.action == 'Asignar'){
    data.status = 'asignado'
    data.assignedTo = event.target.assignedTo.value
  }else if(data.action == 'Desasignar'){
    data.status = 'disponible'
    data.assignedTo = ''
  }else data.status = 'averiado'

  await addDoc(collection(db, "products", lastname, "items", name, "seriales", serial, "history"), data);
  await updateDoc(doc(db, "products", lastname, "items", name, "seriales", serial), {
    assignedTo: data.assignedTo,
    status: data.status,
    location: data.location
  });

  const Data = {
    type: "retiro",
    qty: -1,
    person: data.assignedTo,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
    observations: '-'
  };

  await addDoc(collection(db, "products", lastname, "items", name, "history"), Data);
  await updateDoc(doc(db, "products", lastname, "items", name), {
    Quantity: increment(Data.qty)
  });

  callback()
}; */

export const getSeriales = async (category, item) => {
  const q = query(collection(db, "categories", category, "items", item, "seriales"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data; 
  
};

export const getAvailableSerials = async (category, item) => {
  const q = query(collection(db, "categories", category, "items", item, "seriales"), where("status", "==", "disponible"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data; 
  
};

export const getSerialInfo = async (category, item, serial) => {
  const docRef = doc(db, "categories", category, "items", item, "serials", serial);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } 
  
};

export const getSerialHistory = async (category, item, serial) => {
  const q = query(collection(db, "categories", category, "items", item, "serials", serial, "history"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data; 
  
};


export const withdraw = async (event, category, item, callback) => {
  event.preventDefault();

  const data = {
    type: "retiro",
    qty: event.target.qty.value * -1,
    given_to: event.target.person.value,
    given_by_user_email: auth.currentUser.email,
    timestamp: serverTimestamp(),
    serial: null,
    observations: event.target.observations.value
  };

  if(event.target.seriales.value != null) {
    data.serial = event.target.serials.value
  }

  await addDoc(collection(db, "categories", category, "items", item, "history"), data);
  await updateDoc(doc(db, "categories", category, "items", item), {
    number_of_elements: increment(data.qty)
  });

  if(event.target.serials.value != null){
    const Data = {
      given_by_user_email: auth.currentUser.email,
      timestamp: serverTimestamp(),
      action: 'Asignar',
      given_to: data.given_to,
      status: 'asignado',
      location: event.target.location.value
    };
  
    await addDoc(collection(db, "categories", category, "items", item, "serials", data.serial, "history"), Data);
    await updateDoc(doc(db, "categories", category, "items", item, "serials", data.serial), {
      given_to: Data.given_to,
      status: Data.status
    });
  }

  callback()
};

export const withdrawNS = async (event, category, item, callback) => {
  event.preventDefault();

  const data = {
    type: "retiro",
    qty: event.target.qty.value * -1,
    given_to: event.target.person.value,
    given_by_user_email: auth.currentUser.email,
    timestamp: serverTimestamp(),
    observations: event.target.observations.value
  };

  await addDoc(collection(db, "categories", category, "items", item, "history"), data);
  await updateDoc(doc(db, "categories", category, "items", item), {
    number_of_elements: increment(data.qty)
  });

  callback()
};

export const replenishNS = async (event, category, item, callback) => {
  event.preventDefault();

  const data = {
    type: "reposición",
    qty: event.target.qty.value,
    received_from: event.target.person.value,
    received_by_user_email: auth.currentUser.email,
    timestamp: serverTimestamp(),
  };

  await addDoc(collection(db, "categories", category, "items", item, "history"), data);
  await updateDoc(doc(db, "categories", category, "items", item), {
    number_of_elements: increment(data.qty)
  });

  callback()
};

export const replenish = async (event, category, item, callback) => {
  event.preventDefault();

  const data = {
    type: "reposición",
    qty: event.target.qty.value,
    received_from: event.target.person.value,
    received_by_user_email: auth.currentUser.email,
    timestamp: serverTimestamp(),
    serial: event.target.serial.value
  };

  await addDoc(collection(db, "categories", category, "items", item, "history"), data);
  await updateDoc(doc(db, "categories", category, "items", item), {
    Quantity: increment(data.qty)
  });

  callback()
};

export const getItemHistory = async (category, item) => {
  const q = query(collection(db, "categories", category, "items", item, "history"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data; 
  
};

export const getItemInfo = async(category, item) =>{
  const docRef = doc(db, "categories", category, "items", item);
  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap.data()
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

}

//Read all documents within the products collection
export const getCategories = async () => {
  const q = query(collection(db, "categories"), where("active", "==", true), orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      id: doc.id,
      data: doc.data()});
  });

  return data;
};

export const getCategory = async (cid) => {
  const docRef = doc(db, "categories", cid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

export const getLocations = async () => {
  const q = query(collection(db, "locations"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
};

export const getItems = async(cid) =>{
  const q = query(collection(db, "categories", cid, "items"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({
      id: doc.id,
      data: doc.data()});
  });

 return data
  
}

export const getUserData = async(uid) =>{
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  return docSnap.data()
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

}

export const newDoc = () =>{
  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            text: "\tGithub is the best",
                            bold: true,
                        }),
                    ],
                }),
            ],
        },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "My Document.docx");
  });

  // Done! A file called 'My Document.docx' will be in your file system.
} 