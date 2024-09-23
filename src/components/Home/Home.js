import { Accordion, AccordionSummary, AccordionDetails, Box, Container, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    
    const handleClick = (program) => {
        const formattedTitle = program.title.toLowerCase().replace(/\s+/g, '-');
        navigate(`/program/${formattedTitle}`, {state: {program}})
    }

    const [workoutPrograms, setWorkoutPrograms] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:3300/workoutprograms')
          .then(res=>res.json())
          .then(data => setWorkoutPrograms(data))
          .catch(err=> console.log(err));
      },[])

    return (
        <Container sx={{ marginTop: "100px" }}>
            {workoutPrograms.map(program => (
                <Accordion key={program.p_id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }} onClick={()=>handleClick(program)} variant="h1">{program.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{color:"black"}}>Type: {program.p_type} </Typography>
                        <Typography sx={{color:"black"}}>Days a week: {program.days}</Typography>
                        <Typography sx={{color:"black"}}> Author: {program.author}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}

export default Home;
