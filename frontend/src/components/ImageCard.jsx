/* eslint-disable react/prop-types */
const ImageCard = ({ image }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={image.download_url} 
          alt={`Photo by ${image.author}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800">{image.author}</p>
          <p className="text-sm text-gray-600">
            {image.width} x {image.height}
          </p>
          <a 
            href={image.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Ver original
          </a>
        </div>
      </div>
    );
  };
  
  export default ImageCard;
  