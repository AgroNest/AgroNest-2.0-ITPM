import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import Swal from 'sweetalert2';
import axios from 'axios';
import agronestLogo from '../../images/common/agronestlogo.jpg';

// PDF Document
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.logo} src={agronestLogo} />
        <Text style={styles.title}>Fertilizer Top Selling Areas</Text>
        {data.map((fertilizer, index) => (
          <View key={fertilizer._id} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{fertilizer.area}</Text>
            <Text style={styles.cell}>{fertilizer.noofRegistrations}</Text>
          </View>
        ))}
        <Text style={styles.footer}>AGRONEST, Yaya4, Anuradhapura - {new Date().toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: '#f0f0f0' },
  section: { flexDirection: 'column', alignItems: 'center' },
  logo: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 5 },
  cell: { width: 150, border: 1, padding: 5 },
  footer: { marginTop: 20, fontSize: 10 },
});

const ViewTopAreas = () => {
  const [topAreas, setTopAreas] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/toparea/')
      .then(res => setTopAreas(res.data))
      .catch(err => console.error('Error fetching top areas:', err));
  }, []);

  const handleUpdate = (area) => {
    setUpdateFormData(area);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:8070/topdealer/update/${updateFormData._id}`, updateFormData)
      .then(() => {
        setTopAreas(areas => areas.map(a => a._id === updateFormData._id ? updateFormData : a));
        setShowUpdateForm(false);
        Swal.fire('Updated!', 'Area updated successfully.', 'success');
      });
  };

  const handleDelete = (id) => {
    Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8070/toparea/delete/${id}`);
          setTopAreas(areas => areas.filter(a => a._id !== id));
          Swal.fire('Deleted!', 'Area deleted successfully.', 'success');
        }
      });
  };

  const filteredAreas = topAreas.filter(area =>
    area.area?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Top Area List</Typography>

      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mb: 2 }}>
        Go Back
      </Button>

      <TextField
        label="Search by Area Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, ml: 2 }}
      />

      <PDFDownloadLink
        document={<MyDocument data={filteredAreas} />}
        fileName="Top_Area_Report.pdf"
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        )}
      </PDFDownloadLink>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Area Name</TableCell>
            <TableCell>Number of Registrations</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAreas.map((area, index) => (
            <TableRow key={area._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{area.area}</TableCell>
              <TableCell>{area.noofRegistrations}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small" onClick={() => handleUpdate(area)}>Update</Button>
                <Button variant="contained" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(area._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Dialog */}
      <Dialog open={showUpdateForm} onClose={() => setShowUpdateForm(false)}>
        <DialogTitle>Update Area</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Area Name"
            fullWidth
            value={updateFormData.area || ''}
            onChange={(e) => setUpdateFormData({ ...updateFormData, area: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Number of Registrations"
            type="number"
            fullWidth
            value={updateFormData.noofRegistrations || ''}
            onChange={(e) => setUpdateFormData({ ...updateFormData, noofRegistrations: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateSubmit} variant="contained">Update</Button>
          <Button onClick={() => setShowUpdateForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewTopAreas;
