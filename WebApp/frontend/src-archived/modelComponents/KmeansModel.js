import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ReactMap from './ReactMap';
import {
  DataTableBody,
  Body,
  PageBody
} from "./styledComponents";
import FormCard from './Card'
import ScatterPlot from './ScatterPlot';
import MetricTable from './MetricTable';

function preventDefault(event) {
  event.preventDefault();
}

export default function KmeansModel() {

  return (
    <div>

    
    <Toolbar />
      Dashboard page
    <PageBody id="pagebody">
      Hello
    </PageBody>

    <Body>
      <FormCard />

      {/* <ScatterPlot /> */}
      {/* <MetricTable /> */}
    </Body>

    </div>
  );
}
