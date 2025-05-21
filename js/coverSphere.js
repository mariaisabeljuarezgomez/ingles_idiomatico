// Three.js sphere animation
let scene, camera, renderer, sphere;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#sphereCanvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Sphere geometry
    const geometry = new THREE.SphereGeometry(2, 64, 64);

    // Custom shader material
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            mousePosition: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float time;
            uniform vec2 mousePosition;
            
            void main() {
                vec3 color1 = vec3(0.031, 0.416, 0.635); // #0284c7
                vec3 color2 = vec3(0.027, 0.349, 0.631); // #075985
                vec3 color3 = vec3(0.878, 0.949, 0.996); // #e0f2fe
                
                float noise = sin(vPosition.x * 5.0 + time) * 0.5 + 0.5;
                noise *= sin(vPosition.y * 5.0 + time) * 0.5 + 0.5;
                
                float mouseDistance = length(vPosition.xy - mousePosition);
                float mouseInfluence = smoothstep(1.0, 0.0, mouseDistance);
                
                vec3 finalColor = mix(
                    mix(color1, color2, noise),
                    color3,
                    mouseInfluence * 0.5
                );
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `
    });

    // Create sphere
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate sphere
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.002;
    
    // Update time uniform
    if (sphere.material.uniforms) {
        sphere.material.uniforms.time.value += 0.01;
    }
    
    // Update sphere position based on mouse
    sphere.position.x += (mouseX - sphere.position.x) * 0.05;
    sphere.position.y += (-mouseY - sphere.position.y) * 0.05;
    
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;

    if (sphere.material.uniforms) {
        sphere.material.uniforms.mousePosition.value.x = (event.clientX / window.innerWidth) * 2 - 1;
        sphere.material.uniforms.mousePosition.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize and start animation
init();
animate(); 