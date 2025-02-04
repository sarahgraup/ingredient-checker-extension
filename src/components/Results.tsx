import { Grid } from '@mui/material';
import React from 'react';


interface IIngredients {
  ingredients: string[];
}
// type IIngredients = string[];

export default function Results({ ingredients }:IIngredients) {

  return (
    <Grid container spacing={2}>
      {ingredients.map((element, index)=> <Grid item key={index}>{element}</Grid> 

      )}

    </Grid>
  );
    
}