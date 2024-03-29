import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button';
import {
  getCategories,
  getComanderas,
  getComanderaHistory,
  getItems,
  getItemHistory,
  //getItemInfo,
  getSerials,
  getSerialHistory
} from "../src/service/DBService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddForm from "../components/AddForm";
import AssignForm from "../components/AssignForm";
import { TableSortLabel } from "@mui/material";
import { CSVLink } from "react-csv";
import ItemInfo from "./ItemInfo";
import Stack from "@mui/material/Stack";
import HistoryIcon from "@mui/icons-material/History";
import Button from "@mui/material/Button";
import AddItemForm from "../components/AddItemForm";
import ListIcon from "@mui/icons-material/List";
import ManageItem from "../components/ManageItem";

// import CircularProgress from '@mui/material/CircularProgress';
// import Fade from '@mui/material/Fade';

export default function BasicTable(props) {
  const router = useRouter();

  const [rows, setRows] = useState(null);
  const [data, setData] = useState([]);
  //const [productName, setProductName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (props.categories) {
        setRows(await getCategories());
      } /* else if (props.assignments) {
        setRows(await getComanderaHistory(props.sn));
      }  */else if (props.item) {
        setRows(await getItems(props.cid));
      } else if (props.itemHistory) {
        setRows(await getItemHistory(props.category, props.itemId));
      } else if (props.itemInfo) {
        setRows(await getItemInfo(props.category, props.item));
      } else if (props.serials) {
        setRows(await getSerials(props.category, props.itemId));
      } else if (props.serialHistory){
        setRows(await getSerialHistory(props.category, props.itemId, props.serial))
      }
    }
    fetchData();
  }, [
    props.categories,
    props.item,
    props.itemHistory,
    props.category,
    props.serials,
  ]);

  const fill = ()=>{
    const info = [];
    rows.forEach(row => {
      info.push(row.data)
    });
    return info;
  }

  useEffect(()=>{
    if(rows && rows.length > 0){
      if(rows[0].data != null){
      setData(fill)
    } 
  
  }}, [rows]);

  return (
    <>
      <TableContainer component={Paper}>
        {/* <Button onClick={getProducts}>CLICK</Button> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key={props} >
              {props.categories ? (
                <>
                  <TableCell>Nombre de la categoría</TableCell>
                  <TableCell align="right">Número de elementos</TableCell>
                  <TableCell align="right">Fecha de Creación</TableCell>
                </>
              ) : props.itemHistory ? (
                <>
                  <TableCell>Hora</TableCell>
                  <TableCell>Serial</TableCell>
                  <TableCell align="right">Acción</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Entregado a/por</TableCell>
                  <TableCell align="right">Usuario</TableCell>
                </>
              ) : props.item ? (
                <>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Ubicación Física</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Unidades</TableCell>
                  <TableCell align="center">Acción</TableCell>
                  <TableCell align="center">Detalle</TableCell>
                </>
              ) : props.serials ? (
                <>
                  <TableCell>Serial</TableCell>
                  <TableCell align="right">Estatus</TableCell>
                  <TableCell align="right">Hora de Creación</TableCell>
                  <TableCell align="right">Asignado a</TableCell>
                  <TableCell align="center">Creado por</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </>
              ) : props.serialHistory? (<>
                  <TableCell align="center">Fecha y Hora</TableCell>
                  <TableCell align="right">Ubicación</TableCell>
                  <TableCell align="right">Asignado a</TableCell>
                  <TableCell align="right">Estatus</TableCell>
                  <TableCell align="right">Acción</TableCell>
                  <TableCell align="center">Usuario</TableCell>

              </>) : (
                <>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Especificaciones</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Unidades</TableCell>
                  <TableCell align="center">Ubicación</TableCell>
                  <TableCell align="center">Activo</TableCell>
                  <TableCell align="center">Fecha y Hora</TableCell>
                  <TableCell align="center">Usuario</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) =>
              props.categories ? (
                <>
                  <TableRow
                    hover
                    key={row.data.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      //setProductName(row.name);
                      //console.log(rows)
                      router.push(`/category/${row.id}`);
                    }}
                  >
                    <TableCell key={row.data.name} component="th" scope="row">
                      {row.data.name}
                    </TableCell>
                    <TableCell key={row.data.number_of_elements} align="right">
                      {String(row.data.number_of_elements)}
                    </TableCell>
                    <TableCell key={row.data.date_created} align="right">
                      {String(row.data.date_created.toDate())}
                    </TableCell>
                  </TableRow>
                </>
              ) : props.itemHistory ? (
                <>
                  <TableRow
                    key={row.timestamp}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => {
                    //   router.push(`/comandera/${row.SN}`);
                    // }}
                  >
                    <TableCell
                      key={row.timestamp}
                      align="left"
                      sx={{ margin: 0, paddingRight: 0 }}
                    >
                      {String(row.timestamp.toDate())}
                    </TableCell>
                    {row.serial?
                      <TableCell key={row.serial} align="left">{row.serial}</TableCell> : 
                      <TableCell key={row.serial} align="left">n/a</TableCell>
                    }
                    
                    <TableCell key={row.type} align="right">
                      {row.type}
                    </TableCell>
                    <TableCell key={row.qty} align="right">
                      {row.qty}
                    </TableCell>
                    <TableCell key={row.givenTo_or_receivedFrom} align="right">
                      {row.givenTo_or_receivedFrom}
                    </TableCell>
                    <TableCell key={row.user_email} align="right">
                      {row.user_email}
                    </TableCell>
                  </TableRow>
                </>
              ) : props.item ? (
                <>
                  <TableRow
                    key={row.data.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ margin: 0, paddingRight: 0 }}>
                      {row.data.name}
                    </TableCell>
                    <TableCell align="right">{row.data.location}</TableCell>
                    <TableCell align="right">{row.data.number_of_elements}</TableCell>
                    <TableCell align="right">{row.data.units_of_measurement}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                        margin: 0,
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <AssignForm
                          disabled={row.data.number_of_elements == 0 ? true : false}
                          retirar
                          item={row.id}
                          category={props.cid}
                          product
                          name = {row.data.name}
                        />
                        <AssignForm
                          reponer
                          item={row.id}
                          category={props.cid}
                          product
                          name = {row.data.name}
                        />
                      </Stack>

                      {/* <AssignForm editar name={row.name} productName={props.name}/> */}
                    </TableCell>
                    <TableCell align="right" sx={{ padding: 0, margin: 0 }}>
                      <Stack direction="row" spacing={1}>
                        <ItemInfo name={row.data.name} category={props.cid} item={row.id}/>
                        <Button
                          onClick={() => {
                            router.push(`${props.cid}/${row.id}`);
                          }}
                        >
                          <HistoryIcon />
                        </Button>
                        <AddItemForm
                          serials={row.data.serials}
                          category={props.cid}
                          item={row.id}
                          disabled = {row.data.number_of_elements == 0 ? true : false}
                          role = {props.role == 'editor'? true : false}
                        />
                        <Button
                          onClick={() => {
                            router.push(`${props.cid}/${row.id}/serial`);
                          }}
                          disabled = {row.data.serials ? false : true}
                        >
                          <ListIcon />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </>
              ) : props.serials ? (
                <>
                  <TableRow
                    key={row.date_created}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => {
                    //   router.push(`/comandera/${row.SN}`);
                    // }}
                  >
                    <TableCell key={row.serial} align="right">
                      {row.serial}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      {row.status}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      {String(row.date_created.toDate())}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      {row.assigned_to ? row.assigned_to : "-"}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      {row.created_by_email}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      <Stack direction="row">
                        <Button onClick={()=>{
                          router.push(`/category/${props.category}/${props.itemId}/serial/${row.serial}`)
                        }
                        }>
                          <HistoryIcon />
                        </Button>
                        <ManageItem category={props.category} item={props.itemId} serial={row.serial} role={props.role == "editor"? true:false}/>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </>
              ) : props.serialHistory? (<>
              
                <TableRow
                    key={row.timestamp}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => {
                    //   router.push(`/comandera/${row.SN}`);
                    // }}
                  >
                    <TableCell
                      key={row.timestamp}
                      align="left"
                      sx={{ margin: 0, paddingRight: 0 }}
                    >
                      {String(row.timestamp.toDate())}
                    </TableCell>
                    <TableCell  align="right">
                      {row.location? row.location : '-'}
                    </TableCell>
                    <TableCell  align="right">
                      {row.assigned_to? row.assigned_to : '-'}
                    </TableCell>
                    <TableCell  align="right">
                      {row.status}
                    </TableCell>
                    <TableCell  align="right">
                      {row.action}
                    </TableCell>
                    <TableCell  align="right">
                      {row.assigned_by_user}
                    </TableCell>
                    
                  </TableRow>
              </>) : (
                <>
                  <TableRow
                    key={row.timestamp}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => {
                    //   router.push(`/comandera/${row.SN}`);
                    // }}
                  >
                    <TableCell key={row.name} align="right">
                      {row.name}
                    </TableCell>
                    <TableCell key={row.Specs} align="right">
                      {row.Specs}
                    </TableCell>
                    <TableCell key={row.Quantity} align="right">
                      {row.Quantity}
                    </TableCell>
                    <TableCell key={row.Units} align="right">
                      {row.Units}
                    </TableCell>
                    <TableCell key={row.Location} align="right">
                      {row.Location}
                    </TableCell>
                    <TableCell key={row.active} align="right">
                      {row.active}
                    </TableCell>
                    <TableCell
                      key={row.timestamp}
                      align="left"
                      sx={{ margin: 0, paddingRight: 0 }}
                    >
                      {String(row.timestamp.toDate())}
                    </TableCell>
                    <TableCell key={row.user} align="right">
                      {row.user}
                    </TableCell>
                  </TableRow>
                </>
              )
            )}
            {rows == "" ? (
              <>
                <TableRow>
                  <TableCell align="right">NO HAY REGISTROS</TableCell>
                </TableRow>
              </>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows ? 
        rows.length > 0 ?
        rows[0].data != null? (
        <CSVLink data={data} filename={"inventario-info.csv"}>
          DESCARGAR DATOS
        </CSVLink>
      ) : (
        <CSVLink data={rows} filename={"inventario-info.csv"}>
          DESCARGAR DATOS
        </CSVLink>
      ) : <></> : <></>}
    </>
  );
}
