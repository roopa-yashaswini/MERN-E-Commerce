import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const CCheckbox = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
        label="C1"
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}


export default CCheckbox;
