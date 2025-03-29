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

// PDF Component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.logo} src={agronestLogo} />
        <Text style={styles.title}>Top Selling Dealers</Text>
        {data.map((dealer, index) => (
          <View key={dealer._id} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{dealer.dealername}</Text>
            <Text style={styles.cell}>{dealer.noofsales}</Text>
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

const ViewTopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/topdealer/')
      .then(res => setTopSellers(res.data))
      .catch(err => console.error('Error fetching dealers:', err));
  }, []);

  const handleUpdate = (dealer) => {
    setUpdateFormData(dealer);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:8070/topdealer/update/${updateFormData._id}`, updateFormData)
      .then(() => {
        setTopSellers(dealers => dealers.map(d => d._id === updateFormData._id ? updateFormData : d));
        setShowUpdateForm(false);
        Swal.fire('Updated!', 'Dealer updated successfully.', 'success');
      });
  };

  const handleDelete = (id) => {
    Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8070/topdealer/delete/${id}`);
          setTopSellers(dealers => dealers.filter(d => d._id !== id));
          Swal.fire('Deleted!', 'Dealer deleted successfully.', 'success');
        }
      });
  };

  const filteredSellers = topSellers.filter((dealer) =>
    dealer.dealername?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Top Dealer List</Typography>

      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mb: 2 }}>
        Go Back
      </Button>

      <TextField
        label="Search by Dealer Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, ml: 2 }}
      />

      <PDFDownloadLink
        document={<MyDocument data={filteredSellers} />}
        fileName="Top_Dealers_Report.pdf"
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
            <TableCell>Dealer Name</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSellers.map((d, index) => (
            <TableRow key={d._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{d.dealername}</TableCell>
              <TableCell>{d.noofsales}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small" onClick={() => handleUpdate(d)}>Update</Button>
                <Button variant="contained" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(d._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Dialog */}
      <Dialog open={showUpdateForm} onClose={() => setShowUpdateForm(false)}>
        <DialogTitle>Update Dealer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Dealer Name"
            fullWidth
            value={updateFormData.dealername || ''}
            onChange={(e) => setUpdateFormData({ ...updateFormData, dealername: e.target.value })}
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

export default ViewTopSellers;
