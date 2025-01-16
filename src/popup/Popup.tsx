import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { findIngredients } from 'utils/ingredients';

/**
 * click check ingreidnet send message to content script
 * 
 * 
 */
export default function Popup() {
  
  const analyze = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (!currentTab?.id) {
        console.error("No active tab found");
        return;
      }
      console.log("Sending message to tab:", currentTab.id);
      //dynamically injects content script
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files:["js/contentScript.js"],
      },
        () => {
           if (chrome.runtime.lastError) {
             console.error("Runtime error:", chrome.runtime.lastError);
             return;
           }
          console.log("content script injected. sending message");
          chrome.tabs.sendMessage(
            currentTab.id!,
            { type: "scrapeHtml" },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Runtime error:", chrome.runtime.lastError);
                return;
              }
              console.log("Received response:", response);
              findIngredients(response.ingredients);
            }
          );

        
      })
      
    });
  };

    return (

      <Grid container sx={{ width: '100px', height: '100px' }}>
        <Box>
          <Button onClick={analyze}>Check Ingredients</Button>
        </Box>
      </Grid>
    )

    
};