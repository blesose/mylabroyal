import axios from 'axios';
const API_BASE_URL = 'https://mylab-lts4.onrender.com/';


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
    const response = await this.client.post('api/users/register', userData);
    return response.data;
  }

  async login(userData) {
    const response = await this.client.post('api/users/login', userData);
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

  // Female Health endpoints
  async createCycle(cycleData) {
    const response = await this.client.post('api/females/cycle/create-cycle', cycleData);
    return response.data;
  }

  async getCycles(userId) {
    const response = await this.client.get(`api/females/cycle/${userId}`);
    return response.data;
  }
// Pregnancy endpoints
async createPregnancy(pregnancyData) {
  const response = await this.client.post('api/females/pregnancy/create-pregnancy', pregnancyData);
  return response.data;
}

async getPregnancy(userId) {
  // FIXED: Remove "/get-pregnancy" from the URL - just use userId directly
  const response = await this.client.get(`api/females/pregnancy/${userId}`);
  return response.data;
}


  async createOvulation(ovulationData) {
    const response = await this.client.post('api/females/ovulation/create-ovulation', ovulationData);
    return response.data;
  }

  async getOvulationHistory(userId) {
    const response = await this.client.get(`api/females/ovulation/${userId}`);
    return response.data;
  }
  // Sleep endpoints
async addSleepRecord(sleepData) {
  try {
    const response = await this.client.post('api/shealth/sleeprecovery/add-sleep', sleepData);
    return response.data;
  } catch (error) {
    console.error('Error adding sleep record:', error);
    throw error;
  }
}

async getSleepHistory() {
  try {
    const response = await this.client.get('api/shealth/sleeprecovery/fetch-sleep', {
      timeout: 15000
    });
    console.log('Sleep API Response:', response.data);
    
    // Handle different response structures
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    console.warn('Unexpected sleep response structure:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching sleep history:', error.message);
    return [];
  }
}

async fetchSleepRecordById(recordId) {
  const response = await this.client.get(`api/shealth/sleeprecovery/fetch-onesleep/${recordId}`);
  return response.data;
}

async updateSleepRecord(recordId, sleepData) {
  const response = await this.client.put(`api/shealth/sleeprecovery/update-sleep/${recordId}`, sleepData);
  return response.data;
}

async deleteSleepRecord(recordId) {
  const response = await this.client.delete(`api/shealth/sleeprecovery/delete-sleep/${recordId}`);
  return response.data;
}

// Men's Health endpoints
async createRecordHandler(menHealthData) {
  const response = await this.client.post('api/mens/menhealth/create-record', menHealthData);
  return response.data;
}

async listRecordsHandler() {
  const response = await this.client.get('api/mens/menhealth/list-records');
  return response.data;
}

async getRecordHandler(recordId) {
  const response = await this.client.get(`api/mens/menhealth/${recordId}`);
  return response.data;
}

async updateRecordHandler(recordId, menhealthData) {
  const response = await this.client.put(`api/mens/menhealth/update-record/${recordId}`, menhealthData);
  return response.data;
}

async deleteRecordHandler(recordId) {
  const response = await this.client.delete(`api/mens/menhealth/delete-record/${recordId}`);
  return response.data;
}

// Mental Health endpoints
async getMentalHealthSummary() {
  try {
    const response = await this.client.get('api/mentalhealth/summary');
    return response.data;
  } catch (error) {
    console.log('Mental health summary not available');
    return { success: false, data: null };
  }
}

async getMentalHealthHistory() {
  try {
    const response = await this.client.get('api/mentalhealth/history');
    return response.data;
  } catch (error) {
    console.log('Mental health history not available');
    return { success: false, data: [] };
  }
}
  // Community endpoints
async createPost(postData) {
  const response = await this.client.post('api/communitypost/community/create-post', postData);
  return response.data;
}

async getCommunityPosts() {
  const response = await this.client.get('api/communitypost/community/get-post');
  return response.data;
} 

async getACommunityPosts(postId) {
  const response = await this.client.get(`api/communitypost/community/geta-post/${postId}`);
  return response.data;
}

async deletePost(postId) {
  const response = await this.client.delete(`api/communitypost/community/delete-post/${postId}`);
  return response.data;
}

async likeCommunityPost(id) {
  const response = await this.client.post(`api/communitypost/community/like-post/${id}/like`);
  return response.data;
}

async commentCommunityPost(id, text) {
  const response = await this.client.post(
    `api/communitypost/community/comment-post/${id}/comment`,
    { text }
  );
  return response.data;
}

async deleteComment(postId, commentId) {
  const response = await this.client.delete(
    `api/communitypost/community/delete-comment/${postId}/${commentId}`
  );
  return response.data;
}

async getPostsAnalysis() {
  const response = await this.client.get('api/communitypost/community/analysis-post');
  return response.data;
}

//   // Fitness & Nutrition endpoints
async createFitness(fitnessData) {
  const response = await this.client.post('api/fitnessnutrition/fitness/create-fitness', fitnessData);
  return response.data;
}

async getFitness(activityId) {
  const response = await this.client.get(`api/fitnessnutrition/fitness/get-fitness/${activityId}`);
  return response.data;
}

async getAllFitness() { // Remove fitnessData parameter, it's not used
  try {
    const response = await this.client.get('api/fitnessnutrition/fitness/getall-fitness');
    console.log('📡 API getAllFitness response:', response);
    
    // Your backend returns: { success: true, data: [...activities], analysis: {...} }
    if (response.data && response.data.success) {
      console.log('✅ Activities found:', response.data.data);
      console.log('✅ First activity structure:', response.data.data[0]);
      console.log('✅ First activity has aiTip?', response.data.data[0]?.aiTip);
      return response.data.data; // This should be the array
    }
    
    console.log('⚠️ No data or success false:', response.data);
    return [];
  } catch (error) {
    console.error('❌ Error in getAllFitness:', error);
    throw error;
  }
}

async updateFitness(id, fitnessData) {
  const response = await this.client.put(`api/fitnessnutrition/fitness/update-fitness/${id}`, fitnessData);
  return response.data;
}

async deleteFitness(id) {
  const response = await this.client.delete(`api/fitnessnutrition/fitness/delete-fitness/${id}`);
  return response.data;
}

  async createNutrition(nutritionData) {
    const response = await this.client.post('api/fitnessnutrition/nutrition/create-nutrition', nutritionData);
    return response.data;
  }

  
  async getAllNutrition() {
  try {
    const response = await this.client.get('api/fitnessnutrition/nutrition/getall-nutrition');
    console.log('📡 getAllNutrition response:', response);
    
    // Handle different response structures
    // Your backend returns: { success: true, data: [...] }
    if (response.data?.data) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('❌ Error in getAllNutrition:', error);
    throw error;
  }
}
  
  async updateNutrition(id, nutritionData) {
    const response = await this.client.put(`api/fitnessnutrition/nutrition/update-nutrition/${id}`, nutritionData);
    return response.data;
  }
  
  async deleteNutrition(id) {
    const response = await this.client.delete(`api/fitnessnutrition/nutrition/delete-nutrition/${id}`);
    return response.data;
  }
  
  async getANutrition(activityId) {
    const response = await this.client.get(`api/fitnessnutrition/nutrition/get-nutrition/${activityId}`);
    return response.data;
  }
  // Food database endpoints
async searchFoods(query, limit = 20) {
  const response = await this.client.get(`api/fitnessnutrition/foods/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  return response.data;
}

async getFoodById(foodId) {
  const response = await this.client.get(`api/fitnessnutrition/foods/${foodId}`);
  return response.data;
}

async getFoodsByCategory(category, limit = 10) {
  const response = await this.client.get(`api/fitnessnutrition/foods/category/${category}?limit=${limit}`);
  return response.data;
}

async createCustomFood(foodData) {
  const response = await this.client.post('api/fitnessnutrition/foods/custom', foodData);
  return response.data;
}

async getUserCustomFoods() {
  const response = await this.client.get('api/fitnessnutrition/foods/custom/my-foods');
  return response.data;
}

async calculatePortion(foodId, portionSize, servingUnit) {
  const response = await this.client.post('api/fitnessnutrition/foods/calculate-portion', {
    foodId,
    portionSize,
    servingUnit
  });
  return response.data;
}

  // Self Care endpoints
  async addSelfCare(selfcareData) {
    const response = await this.client.post('api/selfhealth/selfcare/add-selfcare', selfcareData);
    return response.data;
  }
  
  async fetchSelfCareActivities(activitiesId) {
    const response = await this.client.get(`api/selfhealth/selfcare/fetch-aselfcare/${activitiesId}`);
    return response.data;
  }
  
  async updateSelfCare(activitiesId, selfcareData) {
    const response = await this.client.put(`api/selfhealth/selfcare/update-selfcare/${activitiesId}`, selfcareData);
    return response.data;
  }
  
  async deleteSelfCare(id) {
    const response = await this.client.delete(`api/selfhealth/selfcare/delete-selfcare/${id}`);
    return response.data;
  }
  
  async fetchAllSelfCareActivities(selfcareData) {
    const response = await this.client.get("api/selfhealth/selfcare/fetch-selfcare", selfcareData);
    console.log('✅ Self-care activities response:', response);
    return response.data;
  }

 
async createInsight(labinsightsData) {
  const response = await this.client.post('/api/labinsights/lab/create', labinsightsData);
  return response.data;
}
 
async fetchAInsights(insightId) {
  const response = await this.client.get(`/api/labinsights/lab/a/${insightId}`);
  return response.data;
}

async fetchInsights() {
  const response = await this.client.get('/api/labinsights/lab/all');
  return response.data;
}

async getDashboardInsights() {
  const response = await this.client.get('/api/labinsights/lab/dashboard');
  return response.data;
}

async downloadWeeklyReport(filename = null) {
  const url = filename 
    ? `/api/labinsights/lab/weekly-report/download/${filename}`
    : '/api/labinsights/lab/weekly-report/download';
  
  const response = await this.client.get(url, { 
    responseType: 'blob'
  });
  return response;
}

async generateWeeklyReport() {
  const response = await this.client.post('/api/labinsights/lab/weekly-report/generate');
  return response.data;
}

async collectRealData(category) {
  const response = await this.client.post('/api/labinsights/lab/collect-real-data', { category });
  return response.data;
}

async getActivityStats() {
  const response = await this.client.get('/api/labinsights/lab/activity-stats');
  return response.data;
}

async debugDataSources() {
  const response = await this.client.get('/api/labinsights/lab/debug/data-sources');
  return response.data;
}

async collectAllTimeData(category) {
  const response = await this.client.post('/api/labinsights/lab/collect-alltime-data', { category });
  return response.data;
}

async verifyInsights() {
  const response = await this.client.get('/api/labinsights/lab/verify-insights');
  return response.data;
}
}

export const apiService = new ApiService();