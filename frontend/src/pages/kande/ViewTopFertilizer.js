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

// PDF Template
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.logo} src={agronestLogo} />
        <Text style={styles.title}>Top Fertilizers</Text>
        {data.map((item, index) => (
          <View key={item._id} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.fertilizername}</Text>
            <Text style={styles.cell}>{item.noofsales}</Text>
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

const ViewTopFertilizer = () => {
  const [topFertilizers, setTopFertilizers] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/topfertilizercategory/')
      .then(res => setTopFertilizers(res.data))
      .catch(err => console.error('Error fetching fertilizers:', err));
  }, []);

  const handleUpdate = (fertilizer) => {
    setUpdateFormData(fertilizer);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:8070/topfertilizercategory/update/${updateFormData._id}`, updateFormData)
      .then(() => {
        setTopFertilizers(ferts => ferts.map(f => f._id === updateFormData._id ? updateFormData : f));
        setShowUpdateForm(false);
        Swal.fire('Updated!', 'Fertilizer updated successfully.', 'success');
      });
  };

  const handleDelete = (id) => {
    Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8070/topfertilizercategory/delete/${id}`);
          setTopFertilizers(ferts => ferts.filter(f => f._id !== id));
          Swal.fire('Deleted!', 'Fertilizer deleted successfully.', 'success');
        }
      });
  };

  const filteredFertilizers = topFertilizers.filter((f) =>
    f.fertilizername?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Top Fertilizer List</Typography>

      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mb: 2 }}>
        Go Back
      </Button>

      <TextField
        label="Search by Fertilizer Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, ml: 2 }}
      />

      <PDFDownloadLink
        document={<MyDocument data={filteredFertilizers} />}
        fileName="Top_Fertilizers_Report.pdf"
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        )}
      </PDFDownloadLink>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Fertilizer Name</TableCell>
            <TableCell>Number of Sales</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFertilizers.map((f, index) => (
            <TableRow key={f._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{f.fertilizername}</TableCell>
              <TableCell>{f.noofsales}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small" onClick={() => handleUpdate(f)}>Update</Button>
                <Button variant="contained" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(f._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Dialog */}
      <Dialog open={showUpdateForm} onClose={() => setShowUpdateForm(false)}>
        <DialogTitle>Update Fertilizer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Fertilizer Name"
            fullWidth
            value={updateFormData.fertilizername || ''}
            onChange={(e) => setUpdateFormData({ ...updateFormData, fertilizername: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Number of Sales"
            type="number"
            fullWidth
            value={updateFormData.noofsales || ''}
            onChange={(e) => setUpdateFormData({ ...updateFormData, noofsales: e.target.value })}
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

export default ViewTopFertilizer;
