import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Button from '@mui/material/Button';
import {
  getProducts,
  getComanderas,
  getComanderaHistory,
  getItems,
  getItemHistory
} from "../src/service/DBService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddForm from '../components/AddForm'
import AssignForm from '../components/AssignForm'
// import CircularProgress from '@mui/material/CircularProgress';
// import Fade from '@mui/material/Fade';

export default function BasicTable(props) {
  const router = useRouter();

  const [rows, setRows] = useState(null);
  //const [productName, setProductName] = useState(null);
  var products = false;
  var comanderas = false;
  var assignments = false;
  var item = false;
  var itemHistory = false;

  if(props.products){
    products = true;
  } else if(props.comanderas){
    comanderas = true;
  } else if(props.assignments){
    assignments = true;
  } else if(props.item){
    item = true;
  } else if(props.itemHistory){
    itemHistory = true;
  }

    useEffect(() => {  
      async function fetchData(){
        if (products){
          setRows(await getProducts());
        }else if(comanderas){
          setRows(await getComanderas());
        } else if(assignments){
          setRows(await getComanderaHistory(props.sn));
        } else if(item){
          setRows(await getItems(props.name));
        } else if (itemHistory){
          setRows(await getItemHistory(props.lastname, props.name));
        }
      }
      fetchData();
    }, []);

  return (
    <TableContainer component={Paper}>
      {/* <Button onClick={getProducts}>CLICK</Button> */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key={props}>
            {props.products ? (
              <>
                <TableCell>Nombre de la categoría</TableCell>
                <TableCell align="right">Activo</TableCell>
                <TableCell align="right">Creado por</TableCell>
              </>
            ) : props.comanderas ? (
              <>
                <TableCell>SN</TableCell>
                <TableCell align="right">Modelo</TableCell>
                <TableCell align="right">IMEI1</TableCell>
                <TableCell align="right">IMEI2</TableCell>
                <TableCell align="right">Estatus</TableCell>
                <TableCell align="right">Ubicación</TableCell>
              </>
            ) : props.assignments ? (
              <>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Acción</TableCell>
                <TableCell align="right">Motivo</TableCell>
                <TableCell align="right">Comercio</TableCell>
                <TableCell align="right">Ejecutivo</TableCell>
                <TableCell align="right">Observaciones</TableCell>
                <TableCell align="right">Usuario</TableCell>
              </>
            ) : props.itemHistory? (
              <>
                <TableCell>Hora</TableCell>
                <TableCell align="right">Acción</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Entregado a/por</TableCell>
                <TableCell align="right">Usuario</TableCell>
                
            </>
            ) : (
              <>
              <TableCell>Nombre</TableCell>
                <TableCell align="right">Ubicación Física</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Unidades</TableCell>
                <TableCell align="center">Acción</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) =>
            props.products ? (
              <>
                <TableRow
                  hover
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    //setProductName(row.name);
                    //console.log(row.name.replace(/ /g,''))
                    router.push(`/category/${row.name}`);
                  }}
                >
                  <TableCell key={row.name} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell key={row.active} align="right">{String(row.active)}</TableCell>
                  <TableCell key={row.user} align="right">{row.user}</TableCell>
                </TableRow>
              </>
            ) : props.comanderas ? (
              <>
                <TableRow
                  hover
                  key={row.sn}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    router.push(`/comandera/${row.SN}`);
                  }}
                >
                  <TableCell key={row.SN} component="th" scope="row">
                    {row.SN}
                  </TableCell>
                  <TableCell key={row.Model} align="right">{row.Model}</TableCell>
                  <TableCell key={row.IMEI1} align="right">{row.IMEI1}</TableCell>
                  <TableCell key={row.IMEI2} align="right">{row.IMEI2}</TableCell>
                  <TableCell key={row.Estatus} align="right">{row.Estatus}</TableCell>
                  <TableCell key={row.Location} align="right">{row.Location}</TableCell>
                </TableRow>
              </>
            ) : props.assignments ? (
              <>
                <TableRow
                  key={row.timestamp}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={() => {
                  //   router.push(`/comandera/${row.SN}`);
                  // }}
                >
                  <TableCell key={row.timestamp} align="left" sx={{ margin: 0, paddingRight: 0 }}>
                    {String(row.timestamp.toDate())}
                  </TableCell>
                  <TableCell  align="right">{row.action}</TableCell>
                  <TableCell  align="right">{row.reason? row.reason : "-"}</TableCell>
                  <TableCell  align="right">{row.store? row.store : "-"}</TableCell>
                  <TableCell  align="right">{row.seller? row.seller : "-"}</TableCell>
                  <TableCell  align="right">{row.comments? row.comments : "-"}</TableCell>
                  <TableCell  align="right">{row.user}</TableCell>
                </TableRow>
              </>
            ) : props.itemHistory? (
              <>
                <TableRow
                  key={row.timestamp}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={() => {
                  //   router.push(`/comandera/${row.SN}`);
                  // }}
                >
                  <TableCell key={row.timestamp} align="left" sx={{ margin: 0, paddingRight: 0 }}>
                    {String(row.timestamp.toDate())}
                  </TableCell>
                  <TableCell key={row.type} align="right">{row.type}</TableCell>
                  <TableCell key={row.qty} align="right">{row.qty}</TableCell>
                  <TableCell key={row.person} align="right">{row.person}</TableCell>
                  <TableCell key={row.user} align="right">{row.user}</TableCell>
                </TableRow>
              </>
            ) : (
              <>
              <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                >
                  <TableCell  align="left" sx={{ margin: 0, paddingRight: 0 }} onClick={() => {
                    router.push(`${props.name}/${row.name}`);
                  }}>{row.name}</TableCell>
                  <TableCell  align="right" onClick={() => {
                    router.push(`${props.name}/${row.name}`);
                  }}>{row.Location}</TableCell>
                  <TableCell  align="right" onClick={() => {
                    router.push(`${props.name}/${row.name}`);
                  }}>{row.Quantity}</TableCell>
                  <TableCell  align="right" onClick={() => {
                    router.push(`${props.name}/${row.name}`);
                  }}>{row.Unit}</TableCell>
                  <TableCell  align="right"  sx={{display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0}}>

                  <AssignForm retirar name={row.name} productName={props.name}/>
                  <AssignForm reponer name={row.name} productName={props.name}/>
                  {/* <AssignForm editar name={row.name} productName={props.name}/> */}
                  
                  </TableCell>
                </TableRow>
              </>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
