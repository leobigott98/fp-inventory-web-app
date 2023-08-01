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
  var categoryName = null;

  async function fetchData() {
    setRows(await getProducts());
  }

  if (props.products) {
    useEffect(() => {  
      fetchData();
    }, []);
  } else if (props.comanderas) {
    useEffect(() => {
      async function fetchData() {
        setRows(await getComanderas());
      }
      fetchData();
    }, []);
  } else if (props.assignments) {
    useEffect(() => {
      async function fetchData() {
        setRows(await getComanderaHistory(props.sn));
      }
      fetchData();
    }, []);
  } else if (props.item) {
    useEffect(() => {
      async function fetchData() {
        setRows(await getItems(props.name));
      }
      fetchData();
    }, []);
  } else if (props.itemHistory) {
    useEffect(() => {
      async function fetchData() {
        setRows(await getItemHistory(props.lastname, props.name));
      }
      fetchData();
    }, []);
  }

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
                <TableCell align="right">Comercio o Responsable</TableCell>
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
                  <TableCell key={row.action} align="right">{row.action}</TableCell>
                  <TableCell key={row.agent} align="right">{row.agent}</TableCell>
                  <TableCell key={row.observations} align="right">{row.observations}</TableCell>
                  <TableCell key={row.user} align="right">{row.user}</TableCell>
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
