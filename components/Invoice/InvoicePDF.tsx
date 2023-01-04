import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const InvoicePDF = () => {
  return (
    <Document>
      <Page size="A4"></Page>
    </Document>
  );
};

export default InvoicePDF;
