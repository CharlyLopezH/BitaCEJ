import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";

function App() {
 
  const handleChange=()=> {
    throw new Error("Function not implemented.");
  }

  return (
    <>
    <div>
      Cualquier cosa
    </div>
    <hr></hr>
    <Button>Ok</Button>
    <hr/>

<ToggleButtonGroup
  color="primary"
  exclusive
  onChange={handleChange}
  aria-label="Platform"
>
  <ToggleButton value="web">Web</ToggleButton>
  <ToggleButton value="android">Android</ToggleButton>
  <ToggleButton value="ios">iOS</ToggleButton>
</ToggleButtonGroup>

    </>



  )
}

export default App
