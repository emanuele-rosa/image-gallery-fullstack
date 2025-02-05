import { useState, useEffect } from 'react';
import api from '../services/api';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchImages = async (page, search) => {
    try {
      setLoading(true);
      setError('');
      const params = {
        page,
        limit: 12,
        ...(search && { author: search })
      };
      
      const { data } = await api.get('/images', { params });
      setImages(data.images);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError('Erro ao carregar imagens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(currentPage, searchTerm);
  }, [currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    fetchImages(1, term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Galeria de Imagens</h1>
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>

      {!loading && images.length === 0 && (
        <div className="text-center text-gray-600 py-12">
          Nenhuma imagem encontrada
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GalleryPage;