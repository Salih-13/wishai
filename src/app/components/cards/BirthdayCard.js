const BirthdayCard = ({ message, images }) => {
    return (
      <div className="bg-yellow-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-800">
          Happy Birthday!
        </h2>
        <p className="mt-4 text-xl text-center text-yellow-700">{message}</p>
        {images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Images</h2>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded Image ${index + 1}`}
                    className="rounded-lg"
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default BirthdayCard;
  