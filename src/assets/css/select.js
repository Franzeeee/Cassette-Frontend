import chroma from 'chroma-js';
  
  // Custom styles for react-select
 export const customStyle = {
    control: (styles) => ({ ...styles, backgroundColor: 'black' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // Handling color format for chroma
      let color = data.color || '#fff';
      try {
        // Attempt to parse color using chroma
        chroma(color);
      } catch (error) {
        // Log error if color format is unsupported
        console.error('Error parsing color:', color, error);
        // Default color
        color = '#fff';
      }

      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? chroma(color).alpha(1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'black') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : chroma(color).alpha(0.3).css()
            : undefined,
        },
      };
    },
    menu: (styles) => ({ ...styles, backgroundColor: 'black', }),
    input: (styles) => ({ ...styles, color: 'white' }),
  };