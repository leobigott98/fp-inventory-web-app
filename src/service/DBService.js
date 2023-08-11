import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc, setDoc, getDocs, getDoc, query, orderBy, increment} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getApp } from "firebase/app";

const db = getFirestore(getApp);
const auth = getAuth();

//Add a new product
export const newProduct = async (event, callback) => {
  event.preventDefault();
  const data = {
    name: event.target.name.value,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
    active: true,
  };

  await setDoc(doc(db, "products", data.name), {
    name: data.name,
    user: data.user,
    timestamp: data.timestamp,
    active: data.active,
  });

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

//Add a new Comandera
export const newComandera = async (event, callback) => {
  event.preventDefault();

  const data = {
    SN: event.target.sn.value,
    Model: event.target.model.value,
    IMEI1: event.target.imei.value,
    IMEI2: event.target.imeii.value,
    Estatus: event.target.status.value,
    Caja: event.target.caja.value,
    Location: event.target.location.value,
    Comments: event.target.comments.value,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
    active: true,
  };

  await setDoc(doc(db, "comanderas", data.SN), data);

  callback()
};

//Add a new Item within a product subcollection
export const newItem = async (event, name, callback) => {
  event.preventDefault();

  const data = {
    user: auth.currentUser.email,
    name: event.target.name.value,
    timestamp: serverTimestamp(),
    Location: event.target.location.value,
    Comments: event.target.comments.value,
    Quantity: Number(event.target.qty.value),
    Unit: event.target.unit.value,
    Specs: event.target.specs.value,
    //Status: event.target.status.value,
    active: true,
  };

  await setDoc(doc(db, "products", name, "items", data.name), data);

  callback()
};

export const assignComandera = async (event, sn, store, callback) => {
  event.preventDefault();

  const data = {
    action: event.target.action.value,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
    reason: null,
    status: null,
    comments: event.target.comments.value,
    seller: null,
    store: null
  };

  if(data.action === "Disponible"){
    data.status = data.action
  }else if(data.action === "Desvincular"){
    data.reason = event.target.reason.value
    data.seller = event.target.seller.value
    data.store = store;
    if(data.reason === "Avería"){
      data.status = "Averiada"
    }else{
      data.status = "Disponible"
    }
  }else if(data.action === "Vincular"){
    data.status = "Asignada"
    data.store = event.target.store.value
    data.seller = event.target.seller.value
  }else if(data.action === "Averiada"){
    data.status = "Averiada"
  }
 await addDoc(collection(db, "comanderas", sn, "history"), data);
  if(data.action === "Desvincular"){
    await updateDoc(doc(db, "comanderas", sn,), {
      Estatus: data.status,
      Tienda: null
    });
  } else {
    await updateDoc(doc(db, "comanderas", sn,), {
      Estatus: data.status,
      Tienda: data.store
    });
  } 
  

  callback()
};

export const withdraw = async (event, name, lastname, callback) => {
  event.preventDefault();

  const data = {
    type: "retiro",
    qty: event.target.qty.value * -1,
    person: event.target.person.value,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
  };

  console.log(lastname);
  console.log(name);
  await addDoc(collection(db, "products", lastname, "items", name, "history"), data);
  await updateDoc(doc(db, "products", lastname, "items", name), {
    Quantity: increment(data.qty)
  });

  callback()
};

export const replenish = async (event, name, lastname, callback) => {
  event.preventDefault();

  const data = {
    type: "reposición",
    qty: event.target.qty.value,
    person: event.target.person.value,
    user: auth.currentUser.email,
    timestamp: serverTimestamp(),
  };

  console.log(lastname);
  console.log(name);
  await addDoc(collection(db, "products", lastname, "items", name, "history"), data);
  await updateDoc(doc(db, "products", lastname, "items", name), {
    Quantity: increment(data.qty)
  });

  callback()
};

export const getItemHistory = async (lastname, name) => {
  const q = query(collection(db, "products", lastname, "items", name, "history"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data; 
  
};

//Read all documents within the products collection
export const getProducts = async () => {
  const q = query(collection(db, "products"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
};

export const getLocations = async () => {
  const q = query(collection(db, "locations"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
};

export const getStores = async () => {
  const q = query(collection(db, "stores"), orderBy("name", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
};

export const getSellers = async () => {
  const q = query(collection(db, "sellers"), orderBy("name", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
};

export const getComanderas = async () => {
  const q = query(collection(db, "comanderas"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data;
};

export const getComanderaInfo = async (sn) => {
  const docRef = doc(db, "comanderas", sn)
  const docSnap = await getDoc(docRef);
  const status = docSnap.data().Estatus;
  const store = docSnap.data().Tienda;

  if (docSnap.exists()) {
    console.log(status);
    return [status, store];
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  
};

export const getComanderaHistory = async (sn) => {
  const q = query(collection(db, "comanderas", sn, "history"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

 return data
};

export const getItems = async(name) =>{
  const q = query(collection(db, "products", name, "items"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });
  console.log(data)

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

//   const docRef = doc(db, "users", uid);
//   const docSnap = await getDoc(docRef);
//   const data = [];

//   // docSnap.forEach((attribute) =>{
//   //   data.push(attribute.data());
//   // });  

//  return docSnap.data

}

export const updateItem = async(event, category, id) =>{
  const itemRef = doc(db, category, id);

  await updateDoc(itemRef, {
    capital: true
  });

}