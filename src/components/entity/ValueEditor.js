import * as React from 'react';
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';

export default function ValueEditor(props) {
  const {value, setValue} = props;

  function setEntityValue(e) {
    let valueCopy = {...value};
    valueCopy.value_type = e.target.value;
    setValue(valueCopy);
  }

  return (
    <table width="100%">
      <tbody>
      <tr>
        <td>Value Type:</td>
        <td width="90%">
          <TextField
            variant="outlined"
            size="small"
            multiline
            maxRows={5}
            value={value.value_type}
            onChange={(e) => setEntityValue(e)}
            fullWidth/>
        </td>
      </tr>
      <tr>
        <td>Value String:</td>
        <td>
          <TextField
            variant="outlined"
            size="small"
            multiline
            maxRows={5}
            value={value.value_string}
            onChange={(e) => setEntityValue(e)}
            fullWidth/>
        </td>
      </tr>
      <tr>
        <td>Source:</td>
        <td>
          <TextField
            variant="outlined"
            size="small"
            multiline
            maxRows={5}
            value={value.source}
            onChange={(e) => setEntityValue(e)}
            fullWidth/>
        </td>
      </tr>
      <tr>
        <td>Date:</td>
        <td>
          <TextField
            variant="outlined"
            size="small"
            multiline
            maxRows={5}
            value={value.date}
            onChange={(e) => setEntityValue(e)}
            fullWidth/>
        </td>
      </tr>
      <tr>
        <td>Updated at:</td>
        <td>
          <TextField
            variant="outlined"
            size="small"
            multiline
            maxRows={5}
            value={value.date}
            onChange={(e) => setEntityValue(e)}
            fullWidth/>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <Divider/>
        </td>
      </tr>
      </tbody>
    </table>
  )
}
