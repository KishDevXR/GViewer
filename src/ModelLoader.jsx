//ModelLoader.jsx


import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Center, Html, Grid } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Card, CardContent, Typography, Button } from "@mui/material";


const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

const ModelViewer = ({ model }) => {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (model && model.scene) {
      const box = new THREE.Box3().setFromObject(model.scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.scene.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));

      camera.position.set(center.x, center.y, cameraZ + maxDim);
      camera.lookAt(center);

      if (controls) {
        controls.target.set(center.x, center.y, center.z);
        controls.update();
      }
    }
  }, [model, camera, controls]);

  if (!model) return null;
  return <primitive object={model.scene} />;
};

// Function to store the model (to local storage or trigger upload to S3)
const storeModel = (modelData, fileName) => {
  // Convert model data to blob and store in local storage (example)
  const modelBlob = new Blob([modelData], { type: 'application/octet-stream' });
  const reader = new FileReader();

  reader.onloadend = () => {
    // Store the model in local storage
    localStorage.setItem(fileName, reader.result);
    console.log('Model stored in local storage:', fileName);
  };

  reader.readAsDataURL(modelBlob);
};

const ModelLoader = ({ setSelectedModel, selectedSkybox, setShowPreview, showPreview, setModelSettings, setModelUrl, setModelFile, showGrid, selectedVariant, setVariants, uploadedModel }) => {
  const [uploadedModelState, setUploadedModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controlsRef = useRef();

  // Removed setHierarchy usage

  // ✅ Update model when a new variant is selected
  useEffect(() => {
    if (selectedVariant) {
      const reader = new FileReader();
      reader.onload = async (e) => {
          const loader = new GLTFLoader();
          try {
              const gltf = await loader.parseAsync(e.target.result, "");
              setUploadedModel(gltf);
              setSelectedModel(gltf);
          } catch (error) {
              console.error("Error loading variant:", error);
          }
      };
      reader.readAsArrayBuffer(selectedVariant);
  }
  }, [selectedVariant, setSelectedModel]);


  const handleFile = async (file) => {
    if (file && (file.name.endsWith('.gltf') || file.name.endsWith('.glb'))) {
      const reader = new FileReader();
      setLoading(true);
  
      reader.onload = async (e) => {
        const loader = new GLTFLoader();
        try {
          const gltf = await loader.parseAsync(e.target.result, '');
          setUploadedModel(gltf);
          setSelectedModel(gltf);
          setModelFile(file); // Pass the file to the parent component
          setVariants((prevVariants) => {
            if (prevVariants.length === 0) {
              return [file]; // Set imported model as the first variant
            }
            return prevVariants;
          });
          
          // Model is not stored automatically here
          // Call storeModel function from another script if needed
        } catch (error) {
          console.error('Error loading model:', error);
        } finally {
          setLoading(false);
        }
      };
  
      reader.onerror = (error) => {
        console.error('File reading error:', error);
        setLoading(false);
      };
  
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a .gltf or .glb file');
    }
  };


  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  

  return (
    <div className="model-loader-container">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 2]}
        className="AppBg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!showPreview && showGrid &&(
          <Grid
            position={[0, -0.5, 0]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor={"#dfdfdf"}
            sectionSize={2.5}
            sectionThickness={1}
            sectionColor={"#dfdfdf"}
            fadeDistance={30}
            fadeStrength={1}
            infiniteGrid
          />
        )}

        <ambientLight intensity={0.2} />
        <OrbitControls ref={controlsRef} />
        <ContactShadows position={[0, -0.4, 0]} opacity={0.5} scale={10} blur={1.5} far={1} />
        <Environment preset={selectedSkybox || 'city'} background={false} />
        <Center>
          <ModelViewer model={uploadedModel} />
        </Center>

        {!uploadedModel && !loading && (
          <Html center>
            <Card className="upload-options">
              <CardContent>
                <Typography variant="h6" className="drag-drop-message">
                  Drag and drop a 3D model (.gltf or .glb) here or choose a file
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  className="file-input"
                >
                 Browse Files
                  <input
                    type="file"
                    accept=".gltf,.glb"
                    onChange={handleFileInputChange}
                    hidden
                  />
                </Button>
              </CardContent>
            </Card>
          </Html>
        )}

        {loading && (
          <Html center>
            <LoadingSpinner />
          </Html>
        )}
      </Canvas>

      {loading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ModelLoader;
