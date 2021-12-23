import styled from "styled-components";

export const ColorPickerContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 40px;
`;
export const ColorPickerInput = styled.input`
  cursor: pointer;
  position: absolute;
  right: -8px;
  top: -8px;
  width: 56px;
  height: 56px;
  border: none;
`;

const ColorPicker = ({ setColor, color }) => {
  return (
    <ColorPickerContainer>
      <ColorPickerInput
        type="color"
        value={color}
        onChange={setColor}
        required
      />
    </ColorPickerContainer>
  );
};

export default ColorPicker;
