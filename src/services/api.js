import axios from 'axios';


const API_BASE_URL =   'https://mylab-lts4.onrender.com/';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });

    // Add token to requests automatically
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token expiration
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(userData) {
    const response = await this.client.post('/users/register', userData);
    return response.data;
  }

  async login(credentials) {
    const response = await this.client.post('/users/login', credentials);
    return response.data;
  }

async logout() {
    localStorage.removeItem("token");
  };

  async getProfile(userId) {
    const response = await this.client.get(`/users/profile/${userId}`);
    return response.data;
  }
  async getAllUsers() {
    const response = await this.client.get('/users/all-profile');
    return response.data;
  }
  async updateProfile(userId, userData) {
    const response = await this.client.put(`/users/update-profile/${userId}`, userData);
    return response.data;
  }
  async deleteProfile(userId) {
    const response = await this.client.delete(`/users/delete-profile/${userId}`);
    return response.data;
  }
//femalehealth
  // Cycle endpoints
  async createCycle(cycleData) {
    const response = await this.client.post('females/cycle/create-cycle', cycleData);
    return response.data;
  }

  async getCycles(userId) {
    const response = await this.client.get(`females/cycle/get-cycle/${userId}`);
    return response.data;
  }

  // Pregnancy endpoints
  async createPregnancy(pregnancyData) {
    const response = await this.client.post('females/pregnancy/create-pregnancy', pregnancyData);
    return response.data;
  }

  async getPregnancy(userId) {
    const response = await this.client.get(`females/pregnancy/get-pregnancy/${userId}`);
    return response.data;
  }

  async createOvulationEntry(ovulationData) {
    const response = await this.client.post('females/ovulation/create-ovulation', ovulationData);
    return response.data;
  }

  async getOvulationHistory(userId) {
    const response = await this.client.get(`females/ovulation/${userId}`);
    return response.data;
  }
  
  // Sleep endpoints
  async addSleepRecord(sleepData) {
    const response = await this.client.post('shealth/sleeprecovery/add-sleep', sleepData);
    return response.data;
  }

  async getSleepHistory() {
    const response = await this.client.get('shealth/sleep/fetch-sleep');
    return response.data;
  }
  async fetchSleepRecordById(recordId) {
    const response = await this.client.get(`shealth/sleep/fetch-onesleep/${recordId}`);
    return response.data;
  }
  async updateSleepRecord(recordId, sleepData) {
    const response = await this.client.put(`shealth/sleep/update-sleep/${recordId}`, sleepData);
    return response.data;
  }
  async deleteSleepRecord(recordId) {
    const response = await this.client.delete(`shealth/sleep/delete-sleep/${recordId}`);
    return response.data;
  }

  // Men's Health endpoints
  async createRecordHandler(menhealthData) {
    const response = await this.client.post('mens/menhealth/create-record', menhealthData);
    return response.data;
  }
  async listRecordsHandler() {
    const response = await this.client.get('mens/menhealth/list-records');
    return response.data;
  }
  async getRecordHandler(recordId) {
    const response = await this.client.get(`mens/menhealth/${recordId}` );
    return response.data;
  }
  async updateRecordHandler(recordId, menhealthData ) {
    const response = await this.client.put(`mens/menhealth/update-record/${recordId}`, menhealthData);
    return response.data;
  }
  async deleteRecordHandler(recordId) {
    const response = await this.client.delete(`mens/menhealth/delete-record/${recordId}`);
    return response.data;
  }

  // Community endpoints
  async createPost(postData) {
    const response = await this.client.post('communitypost/community/create-post/', postData);
    return response.data;
  }

  async getCommunityPosts() {
    const response = await this.client.get('communitypost/community/get-post/');
    return response.data;
  } 
  async getACommunityPosts(postId) {
    const response = await this.client.get(`communitypost/community/geta-post/${postId}`);
    return response.data;
  } 

  async likeCommunityPost(id) {
    const response = await this.client.post(`communitypost/community/get-post/${id}/like`);
    return response.data;
  }
  async getACommunityPost() {
    const response = await this.client.get('/community/posts');
    return response.data;
  }
  async commentCommunityPost(id) {
    const response = await this.client.post(`communitypost/community/get-post/${id}/comment`);
    return response.data;
  }
  async getPostsAnalysis() {
    const response = await this.client.get('/communitypost/community/analysis-post/');
    return response.data;
  }

  //fitness&nutrition
  async createFitness(fitnessData) {
    const response = await this.client.post('fitnessnutrition/fitness/create-fitness/', fitnessData);
    return response.data;
  }
  async getFitness(activityId) {
    const response = await this.client.get(`fitnessnutrition/fitness/get-fitness/${activityId}`);
    return response.data;
  }
  async getAllFitness() {
    const response = await this.client.get('fitnessnutrition/fitness/getall-fitness/');
    return response.data;
  }
  async updateFitness(id, fitnessData) {
    const response = await this.client.put(`fitnessnutrition/fitness/update-fitness/${id}`, fitnessData);
    return response.data;
  }
  async deleteFitness(id) {
    const response = await this.client.delete(`fitnessnutrition/fitness/update-fitness/${id}`);
    return response.data;
  }
  async createNutrition(nutritionData) {
    const response = await this.client.post('fitnessnutrition/nutrition/create-nutrition/', nutritionData);
    return response.data;
  }

  // Nutrition
  async getAllNutrition() {
    const response = await this.client.get('fitnessnutrition/nutrition/getall-nutrition/');
    return response.data;
  }
  
  async  updateNutrition(id, nutritionData) {
    const response = await this.client.put(`fitnessnutrition/nutrition/update-nutrition/${id}`, nutritionData);
    return response.data;
  }
  
  async deleteNutrition(id) {
    const response = await this.client.delete(`fitnessnutrition/nutrition/delete-nutrition/${id}`);
    return response.data;
  }
  async getANutrition(activityId) {
    const response = await this.client.get(`fitnessnutrition/nutrition/get-nutrition/${activityId}`);
    return response.data;
  }

  async addSelfCare(selfcareData) {
    const response = await this.client.post('selfhealth/selfcare/add-selfcare/', selfcareData);
    return response.data;
  }
  
  async fetchSelfCareActivities(activitiesId) {
    const response = await this.client.get(`/selfhealth/selfcare/fetch-aselfcare/${activitiesId}`);
    return response.data;
  }
  async updateSelfCare(activitiesId, selfcareData) {
    const response = await this.client.put(`/selfhealth/selfcare/update-selfcare/${activitiesId}`, selfcareData);
    return response.data;
  }
  async deleteSelfCare(id) {
    const response = await this.client.get(`/selfhealth/selfcare/delete-selfcare/${id}`);
    return response.data;
  }
  async fetchAllSelfCareActivities(id) {
    const response = await this.client.get(`/selfhealth/selfcare/delete-selfcare/${id}`);
    return response.data;
  }
  async createInsight(labinsightsData) {
    const response = await this.client.get('/labinsights/lab/create/', labinsightsData);
    return response.data;
  }
   
  async fetchAInsights(insightId) {
    const response = await this.client.get(`/labinsights/lab/a/${insightId}`);
    return response.data;
  }
  async fetchInsights() {
    const response = await this.client.get('/labinsights/lab/all');
    return response.data;
  }
  async getDashboardInsights() {
    const response = await this.client.get('/labinsights/lab/dashboard');
    return response.data;
  }
  // async downloadWeeklyReport() {
  //   const response = await this.client.get('/labinsights/lab/weekly-report/download');
  //   return response.data;
  // }

  async downloadWeeklyReport(filename = null) {
  const url = filename 
    ? `/labinsights/lab/weekly-report/download?filename=${filename}`
    : `/labinsights/lab/weekly-report/download`;
  
  const response = await this.client.get(url, { 
    responseType: 'blob' // Important for file downloads
  });
  return response.data;
}
  async generateWeeklyReport() {
    const response = await this.client.post('/labinsights/lab/weekly-report/generate');
    return response.data;
  }
  
}

export const apiService = new ApiService();