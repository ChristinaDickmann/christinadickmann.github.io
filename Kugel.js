var sphere = ( function() {

	function createVertexData() {
		var recursionLevel = parseInt(document.getElementById('recursionLevel').innerHTML[0]);

		var vertices = [];
		var verticesScaled = [];
		var normals = [];
		var indicesLines = [];
		var indicesTris = [];

		var t = ((1.0 + Math.sqrt(5.0)) / 2.0);

        addVertex({ x: -1 , y: t, z: 0});
        addVertex({ x: 1 , y: t, z: 0 });
        addVertex({ x: -1 , y: -t, z: 0});
        addVertex({ x: 1 , y: -t, z: 0});

        addVertex({ x: 0 , y: -1 , z: t  });
        addVertex({ x: 0 , y: 1 , z: t  });
        addVertex({ x: 0 , y: -1 , z: -t  });
        addVertex({ x: 0 , y: 1 , z: -t  });

        addVertex({ x: t , y: 0, z: -1 });
        addVertex({ x: t , y: 0, z: 1  });
        addVertex({ x: -t , y: 0, z: -1 });
        addVertex({ x: -t , y: 0, z: 1  });

		// 5 faces around point 0
		addIndex(indicesTris, indicesLines, { x: 0, y: 11, z: 5 });
		addIndex(indicesTris, indicesLines, { x: 0, y: 5, z: 1 });
		addIndex(indicesTris, indicesLines, { x: 0, y: 1, z: 7 });
		addIndex(indicesTris, indicesLines, { x: 0, y: 7, z: 10 });
		addIndex(indicesTris, indicesLines, { x: 0, y: 10, z: 11 });
  
		// 5 adjacent faces
		addIndex(indicesTris, indicesLines, { x: 1, y: 5, z: 9 });
		addIndex(indicesTris, indicesLines, { x: 5, y: 11, z: 4 });
		addIndex(indicesTris, indicesLines, { x: 11, y: 10, z: 2 });
		addIndex(indicesTris, indicesLines, { x: 10, y: 7, z: 6 });
		addIndex(indicesTris, indicesLines, { x: 7, y: 1, z: 8 });
  
		// 5 faces around point 3
		addIndex(indicesTris, indicesLines, { x: 3, y: 9, z: 4 });
		addIndex(indicesTris, indicesLines, { x: 3, y: 4, z: 2 });
		addIndex(indicesTris, indicesLines, { x: 3, y: 2, z: 6 });
		addIndex(indicesTris, indicesLines, { x: 3, y: 6, z: 8 });
		addIndex(indicesTris, indicesLines, { x: 3, y: 8, z: 9 });
  
		// 5 adjacent faces
		addIndex(indicesTris, indicesLines, { x: 4, y: 9, z: 5 });
		addIndex(indicesTris, indicesLines, { x: 2, y: 4, z: 11 });
		addIndex(indicesTris, indicesLines, { x: 6, y: 2, z: 10 });
		addIndex(indicesTris, indicesLines, { x: 8, y: 6, z: 7 });
		addIndex(indicesTris, indicesLines, { x: 9, y: 8, z: 1 });

		for (var i = 0; i < recursionLevel; i++) {
			var tris = [];
			var lines = [];
  
			for (var j = 0; j < indicesTris.length; j += 3) {
				var m1 = getMiddleVertex(indicesTris[j], indicesTris[j + 1]);
				var m2 = getMiddleVertex(indicesTris[j + 1], indicesTris[j + 2]);
				var m3 = getMiddleVertex(indicesTris[j + 2], indicesTris[j]);
  
				addIndex(tris, lines, { x: indicesTris[j], y: m1, z: m3 });
				addIndex(tris, lines, { x: indicesTris[j + 1], y: m2, z: m1 });
				addIndex(tris, lines, { x: indicesTris[j + 2], y: m3, z: m2 });
				addIndex(tris, lines, { x: m1, y: m2, z: m3 });
			}
  
		indicesTris = tris;
		indicesLines = lines;
		}

		moveAndScaleSphere();

		// Positions.
		this.vertices = new Float32Array(verticesScaled);
		// Normals.
		this.normals = new Float32Array(normals);
		// Index data.
		this.indicesLines = new Uint16Array(indicesLines);
		this.indicesTris = new Uint16Array(indicesTris);
        // Color data
        this.colors = new Float32Array(vertices.length * 3);
        var colors = this.colors;

		//Set Colors
		for (var i = 0; i < vertices.length*3; i ++) {
			colors[i * 4] = Math.abs(normals[i*3]);
			colors[i * 4 + 1] = Math.abs(normals[i*3+1]);
			colors[i * 4 + 2] = Math.abs(normals[i*3+2]);
			colors[i * 4 + 3] = 1;
		}

		function moveAndScaleSphere() {
			var scale = 0.5;
			var translatex = 0;
			var translatey = 0.5;
			var translatez = 0;
			for (var i = 0; i< vertices.length*3; i+=3) {
				var newX = vertices[i]*scale+translatex;
				var newY = vertices[i+1]*scale+translatey;
				var newZ = vertices[i+2]*scale+translatez;
				verticesScaled.push(newX, newY, newZ);
			}
		}

		function addVertex(v) {
			var vLength = Math.sqrt(v.x *v.x + v.y * v.y + v.z * v.z) ;
			var vxNormalized = v.x / vLength;
			var vyNormalized = v.y / vLength;
			var vzNormalized = v.z / vLength;
			 
			vertices.push(vxNormalized, vyNormalized, vzNormalized);
			normals.push(vxNormalized, vyNormalized, vzNormalized);
  
			return (vertices.length / 3) - 1;
		}

		function getMiddleVertex(indexVertex1, indexVertex2) {
		  
			var v1 = getVertexFromArray(indexVertex1);
			var v2 = getVertexFromArray(indexVertex2);
			var m = getMiddle(v1, v2);
  
			// first check if we have it already
			for (var i = 0; i < vertices.length; i += 3) {
				if ((vertices[i] === m.x) && (vertices[i + 1] === m.y) && (vertices[i + 2] === m.z)) {
					return i / 3;
				}
			}

			return addVertex(m);
		}		
  
		function getMiddle(v1, v2) {
		  
			return {
				x: (v1.x + v2.x) / 2.0 ,
				y: (v1.y + v2.y) / 2.0,
				z: (v1.z + v2.z) / 2.0,
			};
		}
  
		function getVertexFromArray(index) {
			return {
				x: vertices[3 * index],
				y: vertices[3 * index + 1],
				z: vertices[3 * index + 2],
			};
		}

		function addIndex(tris, lines, vertex) {
			tris.push(vertex.x, vertex.y, vertex.z);
			lines.push(vertex.x, vertex.y, vertex.y, vertex.z, vertex.z, vertex.x);
		}		
	}

	return {
		createVertexData : createVertexData
	}

}());

