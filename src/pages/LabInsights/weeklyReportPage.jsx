// frontend/components/WeeklyReportPage.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Box
} from '@mui/material';
import {
  Download,
  Refresh,
  AccessTime,
  FitnessCenter,
  SelfImprovement,
  Forum
} from '@mui/icons-material';

const WeeklyReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [weeklyData, setWeeklyData] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    fetchWeeklySummary();
  }, []);

  const fetchWeeklySummary = async () => {
    setLoading(true);
    try {
      const response = await apiService.getDashboardInsights();
      setWeeklyData(response.weeklySummary);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    try {
      const response = await apiService.generateWeeklyReport();
      setDownloadUrl(response.downloadUrl);
      
      // Show success message
      alert('Weekly report generated successfully! Click Download to get your PDF.');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadReport = () => {
    if (downloadUrl) {
      // Extract filename from URL
      const filename = downloadUrl.split('/').pop();
      window.open(`${apiService.client.defaults.baseURL}${downloadUrl}`, '_blank');
    } else {
      alert('Please generate a report first.');
    }
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', padding: '50px' }}>
        <CircularProgress />
        <Typography>Loading your weekly summary...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '30px', marginBottom: '30px' }}>
        <Typography variant="h4" gutterBottom>
          📊 Your Weekly Health Report
        </Typography>
        <Typography color="textSecondary" paragraph>
          View your activity summary from the past 7 days. Generate a detailed PDF report with all your health metrics.
        </Typography>
        
        <Box display="flex" gap={2} marginBottom={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={generateReport}
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate Weekly Report'}
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Download />}
            onClick={downloadReport}
            disabled={!downloadUrl}
          >
            Download PDF Report
          </Button>
        </Box>

        {weeklyData && (
          <>
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
              Weekly Activity Summary
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" marginBottom={2}>
                      <AccessTime color="primary" style={{ marginRight: '10px' }} />
                      <Typography variant="h6">Sleep & Recovery</Typography>
                    </Box>
                    <Typography variant="h4">{weeklyData.totalSleepHours}h</Typography>
                    <Typography color="textSecondary">
                      Average Quality: {weeklyData.avgSleepQuality}/10
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" marginBottom={2}>
                      <FitnessCenter color="secondary" style={{ marginRight: '10px' }} />
                      <Typography variant="h6">Fitness</Typography>
                    </Box>
                    <Typography variant="h4">{weeklyData.totalWorkouts}</Typography>
                    <Typography color="textSecondary">
                      Workout Sessions • {weeklyData.avgCaloriesBurned} avg calories
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" marginBottom={2}>
                      <SelfImprovement color="success" style={{ marginRight: '10px' }} />
                      <Typography variant="h6">Self-Care</Typography>
                    </Box>
                    <Typography variant="h4">{weeklyData.totalSelfCare}</Typography>
                    <Typography color="textSecondary">
                      Mindfulness & Wellness Activities
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" marginBottom={2}>
                      <Forum color="info" style={{ marginRight: '10px' }} />
                      <Typography variant="h6">Community</Typography>
                    </Box>
                    <Typography variant="h4">{weeklyData.totalPosts}</Typography>
                    <Typography color="textSecondary">
                      Posts & Interactions
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Alert severity="info" style={{ marginTop: '20px' }}>
              <Typography variant="body2">
                Your weekly PDF report will include detailed activity logs, personalized insights, 
                and AI-generated health recommendations based on your actual usage data.
              </Typography>
            </Alert>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default WeeklyReportPage;