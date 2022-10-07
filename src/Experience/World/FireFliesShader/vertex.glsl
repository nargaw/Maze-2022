uniform float u_time;
uniform float u_pixelRatio;
uniform float u_size;

attribute float aScale;

void main(){
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    modelPosition.y+=sin(u_time+modelPosition.x*20.)*aScale * 5.;
    modelPosition.x+=sin(u_time+modelPosition.z*20.)*aScale * 5.;
    modelPosition.z+=sin(u_time+modelPosition.z*20.)*aScale * 5.;
    
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    
    gl_Position=projectionPosition;
    gl_PointSize=u_size*aScale*u_pixelRatio;
    gl_PointSize*=(1./-viewPosition.z);
}