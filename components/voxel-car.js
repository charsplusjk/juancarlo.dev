import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Spinner, Th } from "@chakra-ui/react";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { loadGLTFModel } from "../libs/model";
import { easeOut } from "framer-motion";

function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelCar = () => {
    const refContainer = useRef()
    const [loading, setLoading] = useState(true)
    const [renderer, setRenderer] = useState()
    const [_camera, setCamera] = useState()
    const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0))
    const [initialCameraPosition] = useState(
        new THREE.Vector3(
            20 * Math.sin(0.2 * Math.PI),
            10,
            20 * Math.cos(0.2 * Math.PI),
        )
    )

    const [scene] = useState(new THREE.Scene())
    const [_controls, setControls] = useState()

    const handleWindowResize = useCallback(() => {
        const { current: container } = refContainer
        if (container && renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            renderer.setSize(scW, scH)
        }
    }, [renderer])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        console.log("Initializing 3D renderer...");
        const { current: container } = refContainer;
    
        if (container && !renderer) {
            const scW = container.clientWidth;
            const scH = container.clientHeight;
    
            const rendererInstance = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            rendererInstance.setPixelRatio(window.devicePixelRatio);
            rendererInstance.setSize(scW, scH);
            rendererInstance.outputEncoding = THREE.sRGBEncoding;
            container.appendChild(rendererInstance.domElement);
            setRenderer(rendererInstance);
    
            const scale = scH * 0.005 + 4.8;
            const cameraInstance = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale,
                0.01,
                50000
            );
            cameraInstance.position.copy(initialCameraPosition);
            cameraInstance.lookAt(target);
            setCamera(cameraInstance);
    
            const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
            scene.add(ambientLight);
    
            const controlsInstance = new OrbitControls(cameraInstance, rendererInstance.domElement);
            controlsInstance.autoRotate = true;
            controlsInstance.target = target;
            setControls(controlsInstance);
    
            loadGLTFModel(scene, '/car.glb', {
                receiveShadow: false,
                castShadow: false
            }).then(() => {
                animate();
                setLoading(false);
            });
    
            let req = null;
            let frame = 0;
            const animate = () => {
                req = requestAnimationFrame(animate);
    
                frame = frame <= 100 ? frame + 1 : frame;
    
                if (frame <= 100) {
                    const p = initialCameraPosition;
                    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
    
                    cameraInstance.position.y = 10;
                    cameraInstance.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
                    cameraInstance.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
                    cameraInstance.lookAt(target);
                } else {
                    controlsInstance.update();
                }
    
                rendererInstance.render(scene, cameraInstance);
            };
    
            return () => {
                console.log("Cleaning up renderer...");
                cancelAnimationFrame(req);
                if (rendererInstance) {
                    rendererInstance.dispose();
                    const canvas = container.querySelector("canvas");
                    if (canvas) container.removeChild(canvas);
                }
            };
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false)
        return() => {
            window.removeEventListener('resize', handleWindowResize, false)
        }
    }, [renderer, handleWindowResize])

    return (
        <Box
            ref={refContainer}
            className="voxel-car"
            m="auto"
            at={['-20px', '-60px', '-120px']}
            mb={['-40px', '-140px', '-200px']}
            w={[280, 480, 640]}
            h={[280, 480, 640]}
            position="relative"
        >
            {loading && (
                <Spinner
                    size="xl"
                    position="absolute"
                    left="50%"
                    top="50%"
                    ml="calc(0px - var(--spinner-size) / 2)"
                    mt="calc(0px - var(--spinner-size))"
                />
            )}
            Car
        </Box>
    )
}

export default VoxelCar