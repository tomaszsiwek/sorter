"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rack from "./components/Rack";
import Stack from "@mui/material/Stack";
import { Sample, Patient } from "./types";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

const NUMBER_OF_RACKS = 10;
const NUMBER_OF_SLOTS_IN_RACK = 3;

function createData(
  id: Sample["id"],
  age: Patient["age"],
  company: Patient["company"],
  district: Patient["district"],
  visionDefect: Patient["visionDefect"]
) {
  return { id, age, company, district, visionDefect };
}

function generateSamples(numSamples: number): Sample[] {
  const companies = [
    "OptiCorp",
    "VisionTech",
    "EyeCare Inc.",
    "BrightEyes",
    "FocusLab",
  ];
  const districts = ["North", "South", "East", "West", "Central"];
  const visionDefects: Patient["visionDefect"][] = [
    "myopia",
    "hyperopia",
    "astigmatism",
  ];

  const samples: Sample[] = [];

  for (let i = 0; i < numSamples; i++) {
    const id = `sample-${i + 1}`;
    const age = Math.floor(Math.random() * 60) + 18;
    const company = companies[Math.floor(Math.random() * companies.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const visionDefect =
      visionDefects[Math.floor(Math.random() * visionDefects.length)];

    const patient: Patient = createData(
      id,
      age,
      company,
      district,
      visionDefect
    );
    samples.push({ id, patient });
  }

  return samples;
}

function canPlacePatientInRack(rack: Sample[], sample: Sample): boolean {
  return (
    !rack.some((p) => p.patient.age === sample.patient.age) &&
    !rack.some((p) => p.patient.company === sample.patient.company) &&
    !rack.some((p) => p.patient.district === sample.patient.district) &&
    !rack.some((p) => p.patient.visionDefect === sample.patient.visionDefect)
  );
}

function distributePatientsToRacks(
  samples: Sample[],
  maxRacks: number,
  slotsPerRack: number
) {
  const racks: Sample[][] = Array.from({ length: maxRacks }, () => []);
  const rest:Sample[] = [];

  for (const sample of samples) {
    let placed = false;

    for (let i = 0; i < racks.length; i++) {
      if (
        racks[i].length < slotsPerRack &&
        canPlacePatientInRack(racks[i], sample)
      ) {
        racks[i].push(sample);
        placed = true;
        break;
      }
    }

    if (!placed) {
      rest.push(sample);
    }
  }

  return { racks, rest };
}

export const App = () => {
  const [samples, setSamples] = useState(generateSamples(10));
  const [sortedSamples, setSortedSamples] = useState<{
    racks: Sample[][];
    rest: Sample[];
  }>();

  const onSortClick = () => {
    setSortedSamples(
      distributePatientsToRacks(
        samples,
        NUMBER_OF_RACKS,
        NUMBER_OF_SLOTS_IN_RACK
      )
    );
  };

  const onRandomizeClick = () => {
    setSamples(generateSamples(10));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={12}>
          <Typography gutterBottom sx={{ fontSize: 18, fontWeight: "bold" }}>
            Input tray
          </Typography>
        </Grid>
        <Grid size={2} display="flex" justifyContent="center">
          <Button onClick={onRandomizeClick} variant="outlined" fullWidth>
            Randomize
          </Button>
        </Grid>
        <Grid size={2} display="flex" justifyContent="center">
          <Button onClick={onSortClick} variant="outlined" fullWidth>
            Sort
          </Button>
        </Grid>
        <Grid data-testid="app-main-table" size={12}>
          <Rack rows={samples} />
        </Grid>
      </Grid>
      {sortedSamples?.racks && (
        <Stack sx={{ height: "100%", mt: 4 }} spacing={4}>
          <Card sx={{ maxWidth: 800, mx: "auto", width: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sorted Samples
              </Typography>
              <Stack spacing={2}>
                {sortedSamples.racks.map((rack, index) => (
                  <React.Fragment key={`rack-name-${index}`} >
                    <Typography
                      variant="h6"
                      gutterBottom
                    >
                      Rack {index} ({rack.length} / {NUMBER_OF_SLOTS_IN_RACK})
                    </Typography>
                    <Rack rows={rack} />
                  </React.Fragment>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </>
  );
};
