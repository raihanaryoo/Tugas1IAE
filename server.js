const express = require('express')
const app = express()
const axios = require('axios');
const API_KEY = '7b9fcacd49d04b95b14e40beeb3080d0fb6cd1b60406caaeb7a1f40b60236122'; 

// Middleware untuk menambahkan header CORS ke setiap respons
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
 
// //Routing untuk menampilkan data countries FootballAPI
// app.get('/', async (req, res) => {
//   try {
//     const response = await axios.get(`https://apiv3.apifootball.com/?action=get_countries&APIkey=${API_KEY}`);
    
//     // Filter response untuk mendapatkan data negara dengan ID 6
//     const filteredData = response.data.filter(country => country.country_id === '6');
    
//     // Kirimkan data yang difilter sebagai respons
//     res.json(filteredData);
//   } catch(error) {
//     res.status(500).json({ error: 'Failed to fetch football data' });
//   }
// });
 
  
// Routing dan endpoint untuk mengambil dan menampilkan data liga berdasarkan country_id
app.get('/', async (req, res) => {


try {
  // Lakukan permintaan ke API menggunakan countryId yang diberikan
  const response = await axios.get(`https://apiv3.apifootball.com/?action=get_leagues&country_id=6&APIkey=${API_KEY}`);

  // Kirimkan data liga sebagai respons
  res.json(response.data);
} catch (error) {
  // Tangani kesalahan jika terjadi
  console.error('Error fetching leagues:', error);
  res.status(500).json({ error: 'An error occurred while fetching leagues.' });
}
});


// Routing dan endpoint untuk mengambil dan menampilkan data klasemen berdasarkan league_id
app.get('/standings/:leagueId', async (req, res) => {
const { leagueId } = req.params;

try {
  const response = await axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=${leagueId}&APIkey=${API_KEY}`);
  
  res.json(response.data);
} catch (error) {
  console.error('Error fetching standings:', error);
  res.status(500).json({ error: 'An error occurred while fetching standings.' });
}
});

// app.get('/team/:teamId', async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const response = await axios.get(`https://apiv3.apifootball.com/?action=get_teams&team_id=${teamId}&APIkey=${API_KEY}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



app.listen(2000, () => {console.log("Server started on port 2000")})

