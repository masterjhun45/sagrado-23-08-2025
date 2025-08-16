import React from "react";
import { Container, Box } from "@mui/material";
import Hero from "./components/Hero";
import LoginOptions from "./components/LoginOptions";
import MOAInformation from "./components/MOAInformation";
import BeneficiaryDirectory from "./components/BeneficiaryDirectory";
import NewsUpdates from "./components/NewsUpdates";
import PhotoGallery from "./components/PhotoGallery";
import ProgramOverview from "./components/ProgramOverview";
import ContactInformation from "./components/ContactInformation";
import TopBar from "./components/TopBar";

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* ✅ TopBar always visible */}
      <TopBar />

      <Container maxWidth="xl" sx={{ py: 0 }}>
        <Hero />
        <LoginOptions />

        {/* ✅ Add IDs directly on wrapper divs */}
        <Box id="program-overview" sx={{ py: 10 }}>
          <ProgramOverview />
        </Box>

        <Box id="moa-information" sx={{ py: 10 }}>
          <MOAInformation />
        </Box>

        <Box id="beneficiary-directory" sx={{ py: 10 }}>
          <BeneficiaryDirectory />
        </Box>

        <Box id="news-updates" sx={{ py: 10 }}>
          <NewsUpdates />
        </Box>

        <Box id="photo-gallery" sx={{ py: 10 }}>
          <PhotoGallery />
        </Box>

        <Box id="contact-information" sx={{ py: 10 }}>
          <ContactInformation />
        </Box>
      </Container>
    </Box>
  );
}
