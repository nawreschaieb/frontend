export const handleImageUpload = async (file, folder = 'default') => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    // Ajouter des logs pour déboguer
    console.log(`Uploading file: ${file.name} to folder: ${folder}`);

    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    // Vérifier la réponse brute pour le débogage
    const responseText = await response.text();
    console.log('Réponse brute du serveur:', responseText);

    if (!response.ok) {
      console.error('Erreur réponse serveur:', responseText);
      throw new Error('Failed to upload image');
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Erreur parsing JSON:', e);
      throw new Error('Invalid JSON response from server');
    }

    console.log('Réponse upload parsée:', data);

    // Vérification stricte des données retournées
    if (!data.url && !data.imageUrl && !data.secure_url) {
      throw new Error('URL d\'image non trouvée dans la réponse du serveur');
    }

    // Plusieurs tentatives pour trouver l'URL dans différentes propriétés
    const imageUrl = data.imageUrl || data.url || data.secure_url;
    const publicId = data.public_id || data.filename;

    return {
      imageUrl: imageUrl,
      public_id: publicId
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};