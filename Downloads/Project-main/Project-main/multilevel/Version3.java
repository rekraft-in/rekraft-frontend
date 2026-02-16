public class Version3 extends Version2 {
    protected  float version;
    protected String advanced_features;

    //default constructor
    public Version3(){
        System.out.println("VERSION_3-Default Constructor");
    }

    //parameterized constructor
    public Version3(float version, String advanced_features, String versionName, int releaseYear, double versionID, String features){
        super(versionName,versionID,features,releaseYear);
        System.out.println("VERSION_3-Parameterized constructor");
        this.version=version;
        this.advanced_features=advanced_features;
        view(version);
        view(advanced_features);
    }

    //methods
    public void view(float version){
        System.out.println("Version3_version:"+version);
    }

    public void view(String advanced_features){
        System.out.println("Version3_advanced_features:"+advanced_features);
    }
}
