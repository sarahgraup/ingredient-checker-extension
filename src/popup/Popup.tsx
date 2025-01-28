import React, {useState} from 'react';
import { Grid, Box, Button, Divider, Typography } from '@mui/material';
import { findIngredients } from 'utils/ingredients';
import SpinnerButton from 'components/SpinnerButton';
import Results from 'components/Results';
/**
 * click check ingreidnet send message to content script
 * 
 * 
 */


export default function Popup() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  const analyze = () => {
    setIsLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (!currentTab?.id) {
        console.error('No active tab found');
        return;
      }
      console.log('Sending message to tab:', currentTab.id);
      //dynamically injects content script
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files:['js/contentScript.js'],
      },
      () => {
        if (chrome.runtime.lastError) {
          setIsLoading(false);
          console.error('Runtime error:', chrome.runtime.lastError);
          return;
        }
        console.log('content script injected. sending message');
        chrome.tabs.sendMessage(
            currentTab.id!,
            { type: 'scrapeHtml' },
            (response) => {
              if (chrome.runtime.lastError) {
                setIsLoading(false);
                console.error('Runtime error:', chrome.runtime.lastError);
                return;
              }
              console.log('Received response:', response);
              if (response.success) {
                const foundIngredients = findIngredients(response.ingredients);
                setIngredients(foundIngredients);
                setIsLoading(false);
                
              } else {
                setIsLoading(false);
                setIngredients(['no ingredients found']);
              }
              
            }
        );

        
      });
      
    });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        width: '300px',
        height: '200px',
        borderRadius: '50%',
      }}
    >
      <Grid item xs={12}>
        <Box sx={{ padding: '4%' }}>
          <Typography variant="h1">Ingredient Checker</Typography>
        </Box>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        {/* <SpinnerButton
          onClick={analyze}
          color="primary"
          variant="contained"
          isLoading={isLoading}
        >
          Check Ingredients
        </SpinnerButton> */}
        <Button color="primary" variant="contained" onClick={analyze}>
          Check Ingredients
        </Button>
        {ingredients && (
          <Results ingredients={ingredients}/>
        )}
      </Grid>
    </Grid>
  );

    
};