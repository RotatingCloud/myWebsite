import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { VOXLoader, VOXMesh } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/VOXLoader.js';

let camera, controls, scene, renderer;

init();
animate();
displayPalette();


function init() {

    var container = document.getElementById('box');

    //create camera
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 1000);
    //set pos
    camera.position.set(2, -2, 5);
    camera.position.z -= 5;

    camera.updateProjectionMatrix();

    //create scene
    scene = new THREE.Scene();
    //add camera to scene
    scene.add( camera );
    scene.background = new THREE.Color( 0x9B886A );

    //create light
    const hemiLight = new THREE.HemisphereLight( 0x888888, 0x444444, 1 );
    scene.add( hemiLight );
    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( 1.5, 3, 2.5 );
    scene.add( dirLight );
    const dirLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight2.position.set( -5, - 2, - 5.5 );
    scene.add( dirLight2 );

    //vox loader
    const loader = new VOXLoader();
    loader.load( '../assets/myteddybear.vox', function ( chunks ) {

        for ( let i = 0; i < chunks.length; i ++ ) {

            const chunk = chunks[ i ];

            const mesh = new VOXMesh( chunk );
            mesh.scale.setScalar( 0.0015 );
            scene.add( mesh );

        }

        const bbox = new THREE.Box3().setFromObject(mesh);
        const center = bbox.getCenter(new THREE.Vector3());

        
        camera.lookAt(center);

    } );

    // renderer

    renderer = new THREE.WebGLRenderer(  {antialias: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    container.appendChild(renderer.domElement);

    // controls

    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxDistance = 0.12;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.3;
    controls.maxPolarAngle = Math.PI / 2.4;
    controls.minPolarAngle = Math.PI / 2.4;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.zoomSpeed = 6;
    controls.zoomEnable = false;
    //

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );

}
