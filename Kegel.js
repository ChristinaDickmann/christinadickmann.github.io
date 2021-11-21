var kegel = ( function() {

	function createVertexData() {
		var n = 32;
		var m = 16;

		// Positions.
		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array(2 * 2 * n * m);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array(3 * 2 * n * m);
		var indicesTris = this.indicesTris;
        // Color data
        this.colors = new Float32Array(vertices.length * 3);
        var colors = this.colors;

		var du = 2 * Math.PI / n;
		var dv = 1 / m;
		var r = 0.6;
		// Counter for entries in index array.
		var iLines = 0;
		var iTris = 0;

		// Loop angle u.
		for(var i = 0, u = -Math.PI; i <= n; i++, u += du) {
			// Loop angle v.
			for(var j = 0, v = 0; j <= m; j++, v += dv) {

				var iVertex = i * (m + 1) + j;

				var x = r*v*Math.cos(u);
				var z = -r*v*Math.sin(u);
				var y = -v;

				// Set vertex positions.
				vertices[iVertex * 3] = x-2.5;
				vertices[iVertex * 3 + 1] = y+1;
				vertices[iVertex * 3 + 2] = z;

				// Calc and set normals.
				var nx = Math.cos(u) * Math.cos(v);
				var ny = Math.cos(u) * Math.sin(v);
				var nz = Math.sin(u);
				normals[iVertex * 3] = nx;
				normals[iVertex * 3 + 1] = ny;
				normals[iVertex * 3 + 2] = nz;

				//Set Colors
                colors[iVertex * 4] = v;
                colors[iVertex * 4 + 1] = u;
                colors[iVertex * 4 + 2] = 0.8;
                colors[iVertex * 4 + 3] = 1;

				// Set index.
				// Line on beam.
				if(j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - 1;
					indicesLines[iLines++] = iVertex;
				}
				// Line on ring.
				if(j > 0 && i > 0) {
					indicesLines[iLines++] = iVertex - (m + 1);
					indicesLines[iLines++] = iVertex;
				}

				// Set index.
				// Two Triangles.
				if(j > 0 && i > 0) {
					indicesTris[iTris++] = iVertex;
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m + 1);
					//
					indicesTris[iTris++] = iVertex - 1;
					indicesTris[iTris++] = iVertex - (m + 1) - 1;
					indicesTris[iTris++] = iVertex - (m + 1);
				}
			}
		}
	}

	return {
		createVertexData : createVertexData
	}

}());
