export const findNearestRiver = async (latitude: number, longitude: number) => {
  try {
    const overpassUrl = `https://lz4.overpass-api.de/api/interpreter`;
    const query = `[out:json];(way["waterway"="river"](around:5000,${latitude},${longitude}););out;`;
    let river: string = '';
    await fetch(overpassUrl, {
      method: 'POST',
      body: query
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data.elements.length > 0) {
          // Lấy thông tin về sông gần nhất từ kết quả trả về
          const nearestRiver = data.elements[0];
          river = nearestRiver.tags.name;
        } else {
          console.log('No river found nearby.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return river;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
