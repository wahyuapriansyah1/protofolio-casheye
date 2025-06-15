// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas3d').appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040); // Tetap gelap untuk kontras
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create floating objects
const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshPhongMaterial({
    /* Warna objek 3D menyesuaikan gradien baru (Hijau Muda) */
    color: 0x8BC34A, /* Warna hijau muda dari gradien baru */
    transparent: true,
    opacity: 0.7,
    shininess: 100,
    emissive: 0x0,
    specular: 0x111111
});

const objects = [];
const count = 15;

for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.position.x = Math.random() * 20 - 10;
    mesh.position.y = Math.random() * 20 - 10;
    mesh.position.z = Math.random() * 20 - 10;
    mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
    mesh.userData = {
        speed: Math.random() * 0.01 + 0.005,
        rotation: new THREE.Vector3(
            Math.random() * 0.02 - 0.01,
            Math.random() * 0.02 - 0.01,
            Math.random() * 0.02 - 0.01
        )
    };
    scene.add(mesh);
    objects.push(mesh);
}

camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    objects.forEach(obj => {
        obj.rotation.x += obj.userData.rotation.x;
        obj.rotation.y += obj.userData.rotation.y;
        obj.rotation.z += obj.userData.rotation.z;
        obj.position.x += Math.sin(Date.now() * obj.userData.speed) * 0.001;
        obj.position.y += Math.cos(Date.now() * obj.userData.speed) * 0.001;
    });
    renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ... (kode JavaScript sebelumnya) ...

// Logic untuk tombol "Kembali ke Atas" (Scroll to Top Button)
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Fungsi untuk menampilkan/menyembunyikan tombol
    const toggleScrollToTopButton = () => {
        if (window.scrollY > 400) { // Tombol akan muncul setelah scroll 400px ke bawah
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    // Event listener saat menggulir halaman
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Event listener saat tombol diklik
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0, // Gulir ke posisi paling atas
            behavior: 'smooth' // Gulir dengan animasi halus
        });
    });

    // Panggil sekali saat halaman dimuat untuk memeriksa posisi awal
    toggleScrollToTopButton();
});