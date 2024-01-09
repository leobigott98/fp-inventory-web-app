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
  getSeriales,
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
  //const [productName, setProductName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (props.categories) {
        setRows(await getCategories());
      } else if (props.comanderas) {
        setRows(await getComanderas());
      } else if (props.assignments) {
        setRows(await getComanderaHistory(props.sn));
      } else if (props.item) {
        setRows(await getItems(props.cid));
      } else if (props.itemHistory) {
        setRows(await getItemHistory(props.lastname, props.name));
      } /* else if (props.itemInfo) {
        setRows(await getItemInfo(props.lastname, props.name));
      } */ else if (props.seriales) {
        setRows(await getSeriales(props.lastname, props.name));
      } else if (props.serialHistory){
        setRows(await getSerialHistory(props.category, props.product, props.serial))
      }
    }
    fetchData();
  }, [
    props.categories,
    props.comanderas,
    props.assignments,
    props.item,
    props.itemHistory,
    props.sn,
    props.name,
    props.lastname,
  ]);

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
              ) : props.seriales ? (
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
                    <TableCell key={row.Model} align="right">
                      {row.Model}
                    </TableCell>
                    <TableCell key={row.IMEI1} align="right">
                      {row.IMEI1}
                    </TableCell>
                    <TableCell key={row.IMEI2} align="right">
                      {row.IMEI2}
                    </TableCell>
                    <TableCell key={row.Estatus} align="right">
                      {row.Estatus}
                    </TableCell>
                    <TableCell key={row.Location} align="right">
                      {row.Location}
                    </TableCell>
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
                    <TableCell
                      key={row.timestamp}
                      align="left"
                      sx={{ margin: 0, paddingRight: 0 }}
                    >
                      {String(row.timestamp.toDate())}
                    </TableCell>
                    <TableCell align="right">{row.action}</TableCell>
                    <TableCell align="right">
                      {row.reason ? row.reason : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.store ? row.store : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.seller ? row.seller : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {row.comments ? row.comments : "-"}
                    </TableCell>
                    <TableCell align="right">{row.user}</TableCell>
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
                    <TableCell key={row.serial} align="left">
                      {row.serial}
                    </TableCell>
                    <TableCell key={row.type} align="right">
                      {row.type}
                    </TableCell>
                    <TableCell key={row.qty} align="right">
                      {row.qty}
                    </TableCell>
                    <TableCell key={row.person} align="right">
                      {row.person}
                    </TableCell>
                    <TableCell key={row.user} align="right">
                      {row.user}
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
                        />
                        <AssignForm
                          reponer
                          item={row.id}
                          category={props.cid}
                          product
                        />
                      </Stack>

                      {/* <AssignForm editar name={row.name} productName={props.name}/> */}
                    </TableCell>
                    <TableCell align="right" sx={{ padding: 0, margin: 0 }}>
                      {/* <Stack direction="row" spacing={1}>
                        <ItemInfo name={row.data.name} category={props.name} />
                        <Button
                          onClick={() => {
                            router.push(`${props.name}/${row.name}`);
                          }}
                        >
                          <HistoryIcon />
                        </Button>
                        <AddItemForm
                          seriales={row.seriales}
                          name={row.name}
                          lastname={props.name}
                          disabled = {row.Quantity == 0 ? true : false}
                        />
                        <Button
                          onClick={() => {
                            router.push(`${props.name}/${row.name}/serial`);
                          }}
                        >
                          <ListIcon />
                        </Button>
                      </Stack> */}
                    </TableCell>
                  </TableRow>
                </>
              ) : props.seriales ? (
                <>
                  <TableRow
                    key={row.timestamp}
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
                      {String(row.timestamp.toDate())}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      {row.assignedTo ? row.assignedTo : "-"}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      {row.user}
                    </TableCell>
                    <TableCell key={row.serial} align="right">
                      <Stack direction="row">
                        <Button onClick={()=>{
                          router.push(`/category/${props.lastname}/${props.name}/serial/${row.serial}`)
                        }
                        }>
                          <HistoryIcon />
                        </Button>
                        <ManageItem name={props.name} lastname={props.lastname} serial={row.serial}/>
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
                      {row.assignedTo? row.assignedTo : '-'}
                    </TableCell>
                    <TableCell  align="right">
                      {row.status}
                    </TableCell>
                    <TableCell  align="right">
                      {row.action}
                    </TableCell>
                    <TableCell  align="right">
                      {row.user}
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
      {rows ? (
        <CSVLink data={rows} filename={"inventario-info.csv"}>
          DESCARGAR DATOS
        </CSVLink>
      ) : (
        <></>
      )}
    </>
  );
}
