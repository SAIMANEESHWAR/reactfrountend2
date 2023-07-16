import React from 'react';

function MyComponent() {
    window.handleButtonClick = () => {
    console.log('Button clicked');
  };

  const buttonHTML = '<button onclick="handleButtonClick()">Click Me</button>';

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: buttonHTML }} />
    </div>
  );
}

export default MyComponent;