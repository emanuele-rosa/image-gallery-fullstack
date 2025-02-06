import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../components/NotificationSystem';
import { LoadingButton } from '../components/LoadingSpinner';
import api from '../services/api';

const UploadPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    author: '',
    width: '',
    height: '',
    url: '',
    download_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        width: parseInt(formData.width),
        height: parseInt(formData.height)
      };

      await api.post('/images', data);
      addNotification('Imagem enviada com sucesso!', 'success');
      navigate('/');
    } catch (err) {
      addNotification(err.response?.data?.message || 'Erro ao enviar imagem', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload de Imagem</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Autor
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Largura
            </label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL da Imagem
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de Download
          </label>
          <input
            type="url"
            name="download_url"
            value={formData.download_url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <LoadingButton
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Enviar Imagem
        </LoadingButton>
      </form>
    </div>
  );
};

export default UploadPage;