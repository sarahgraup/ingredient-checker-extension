import React from 'react';
import { Grid, Box, Button } from '@mui/material';

/**
 * click check ingreidnet send message to content script
 * 
 * 
 */
export default function Popup() {
  const analyze = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabToScrape) => {
      if (tabToScrape && tabToScrape.length > 0 && tabToScrape[0] && tabToScrape[0].id) {
        chrome.tabs.sendMessage(tabToScrape[0].id!, { type: 'scrapeHtml' }, (response) => {
          console.log("response", response);
        })
      }
    });
      chrome.runtime.sendMessage({ action: 'analyze' });
    };

    return (

      <Grid container sx={{ width: '100px', height: '100px' }}>
        <Box>
          <Button onClick={analyze}>Check Ingredients</Button>
        </Box>
      </Grid>
    )

    
};