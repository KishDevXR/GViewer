//insceptor.jsx

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/joy/Typography";
import GridOnIcon from "@mui/icons-material/GridOn";
import GridOffIcon from "@mui/icons-material/GridOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Switch from "@mui/joy/Switch";

const BgcustomColors = ["#EBEBEB", "#F7F7F7", "#3E3E3E", "#1C1A1D"];

const Inspector = ({
  selectedModel,
  onSkyboxChange,
  setShowPreview,
  setModelSettings,
  setShowGrid,
  showGrid,
  onVariantUpload, // New prop for handling variant upload
  onToggleVariant, // New prop for toggling between variants
  variants, // Array of variants
  currentVariantIndex, // Index of the currently displayed variant
}) => {
  // if (!selectedModel) {
  //   return <div className="no-model-message">No model Uploaded</div>;
  // }
  const modelName = selectedModel?.scene?.name || "Unnamed Model";


  return (
    <Box
      sx={{
        width: 300,
        bgcolor: "background.level1",
        p: 2,
        height: "100vh",
        overflowY: "auto",
        borderLeft: "1px solid",
        borderColor: "divider",
        boxShadow: "sm",
      }}
    >
      {/* Model Info
      <Box sx={{ mb: 3, p: 2, borderRadius: "sm", boxShadow: "xs" }}>
        <Typography level="h4" sx={{ mb: 1.5, fontWeight: "lg" }}>
          Model Inspector
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography level="body-sm">
            <strong>Name:</strong> {selectedModel.scene.name || "Unnamed"}
          </Typography>
          <Typography level="body-sm">
            <strong>Objects:</strong> {selectedModel.scene.children.length}
          </Typography>
        </Box>
      </Box> */}

      {/* Background Settings */}
      <BackgroundSetting setModelSettings={setModelSettings} />

      {/* Skybox Settings */}
      <SkyboxSetting onSkyboxChange={onSkyboxChange} />

      {/* Variant Settings */}
      <VariantSettings
        onVariantUpload={onVariantUpload}
        onToggleVariant={onToggleVariant}
        variants={variants}
        currentVariantIndex={currentVariantIndex}
        selectedModel={selectedModel} // Pass selectedModel here
      />

      {/* Preview Button */}
      <PreviewButton setShowPreview={setShowPreview} />

      {/* Grid Setting Component */}
      <GridSetting setShowGrid={setShowGrid} showGrid={showGrid} />
    </Box>
  );
};

const BackgroundSetting = ({ setModelSettings }) => {
  const handleColorChange = (color) => {
    setModelSettings((prev) => ({ ...prev, background: color }));

    const appBgElements = document.getElementsByClassName("AppBg");
    for (let element of appBgElements) {
      element.style.backgroundColor = color;
    }
  };

  return (
    <div>
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "sm", mb: 2 }}>
        <Typography level="h4" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <SettingsIcon sx={{ mr: 1, fontSize: "0.8rem" }} />
          Background Settings
        </Typography>
        <BackgroundColorSelector
          colors={BgcustomColors}
          defaultColor="#df0a0a"
          onColorChange={handleColorChange}
        />
      </Box>
    </div>
  );
};

const BackgroundColorSelector = ({
  colors = ["#EBEBEB", "#F7F7F7", "#FFFFFF", "#FFFF00", "#800080"],
  defaultColor = "#EBEBEB",
  onColorChange,
}) => {
  const [selectedColor, setSelectedColor] = React.useState(defaultColor);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    onColorChange(newColor);
  };

  return (
    <RadioGroup
      value={selectedColor}
      onChange={handleColorChange}
      sx={{ gap: 2, flexWrap: "wrap", flexDirection: "row" }}
    >
      {colors.map((color) => (
        <Sheet
          key={color}
          sx={{
            position: "relative",
            width: 20,
            height: 20,
            flexShrink: 0,
            bgcolor: color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Radio
            overlay
            variant="solid"
            color="neutral"
            checkedIcon={<Done fontSize="xl2" />}
            value={color}
            slotProps={{
              input: { "aria-label": color },
              radio: { sx: { display: "contents", "--variant-borderWidth": "2px" } },
            }}
            sx={{
              "--joy-focus-outlineOffset": "4px",
              "--joy-palette-focusVisible": (theme) => theme.vars.palette.neutral[500],
            }}
          />
        </Sheet>
      ))}
    </RadioGroup>
  );
};

const SkyboxSetting = ({ onSkyboxChange }) => {
  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "sm", mb: 2 }}>
      <Typography level="h4" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <SettingsIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
        Skybox Settings
      </Typography>
      <SkyboxSelector onSelectionChange={onSkyboxChange} />
    </Box>
  );
};

const SkyboxSelector = ({ onSelectionChange }) => {
  const skyboxOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "city", label: "City" },
    { value: "dawn", label: "Dawn" },
    { value: "forest", label: "Forest" },
    { value: "lobby", label: "Lobby" },
    { value: "night", label: "Night" },
    { value: "park", label: "Park" },
    { value: "studio", label: "Studio" },
    { value: "sunset", label: "Sunset" },
    { value: "warehouse", label: "Warehouse" },
  ];

  const handleChange = (event, newValue) => {
    onSelectionChange(newValue);
  };

  return (
    <Select
      defaultValue="city"
      onChange={handleChange}
      variant="outlined"
      size="sm"
      sx={{ width: 200 }}
    >
      {skyboxOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

const PreviewButton = ({ setShowPreview }) => {
  const handlePreview = () => {
    setShowPreview(true); // Hide Inspector and Hierarchy panels
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "sm", mt: 2 }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        Preview
      </Typography>
      <Button variant="contained" fullWidth onClick={handlePreview}>
        Open Preview
      </Button>
    </Box>
  );
};

const GridSetting = ({ setShowGrid, showGrid }) => {
  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "sm", mb: 2 }}>
      <Typography variant="h6">Grid Settings</Typography>

      {/* Grid Toggle Button */}
      <Button
        variant="contained"
        startIcon={showGrid ? <GridOffIcon /> : <GridOnIcon />}
        onClick={() => setShowGrid((prev) => !prev)}
        sx={{ mt: 2 }}
      >
        {showGrid ? "Hide Grid" : "Show Grid"}
      </Button>
    </Box>
  );
};

const VariantSettings = ({
  onVariantUpload,
  onToggleVariant,
  variants = [], // Default to an empty array if variants is undefined
  currentVariantIndex,
  selectedModel, // Pass the selected model as a prop
}) => {
  // const [hasVariants, setHasVariants] = useState(false);

  // const handleToggleVariants = (event) => {
  //   setHasVariants(event.target.checked);
  //   if (!event.target.checked) {
  //     onToggleVariant(0); // Reset to the first variant if variants are disabled
  //   }
  // };

  const handleAddVariant = (file) => {
    if (file) {
      try {
        onVariantUpload(file);
      } catch (error) {
        console.error("Error uploading variant:", error);
        // Optionally, show a user-friendly error message
      }
    }
  };
   // Combine the initial model and uploaded variants into a single list
   const allVariants = selectedModel ? [selectedModel, ...variants] : variants;

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "sm", mb: 2 }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        Variant Settings
      </Typography>

      {/* Toggle for enabling/disabling variants */}
      {/* <FormControl>
        <FormLabel>Enable Variants</FormLabel>
        <Switch checked={hasVariants} onChange={handleToggleVariants} />
      </FormControl> */}

      {/* {hasVariants && ( */}
        <>
          {/* Add Variant Button */}
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Variant
            <input type="file" hidden accept=".glb,.gltf" onChange={(e) => handleAddVariant(e.target.files[0])} />
          </Button>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <Select
            value={currentVariantIndex}
            onChange={(event, newValue) => onToggleVariant(parseInt(newValue))}
            variant="outlined"
            size="sm"
            sx={{ mt: 2, width: "100%" }}
          >
            {variants.map((variant, index) => (
              <Option key={index} value={index}>
                Variant {index + 1}
              </Option>
            ))}
          </Select>
          )}
        </>
      {/* )} */}
    </Box>
  );
};

export default Inspector;
