public class Version2 extends Version1 {
    protected  String features;
    protected double versionID;

    //default constructor
    public Version2(){
        System.out.println("VERSION_2-Default Constructor");
    }

    //parameterized constructor
    public Version2(String features, double versionID, String versionName, int releaseYear){
        super(versionName,releaseYear);
        System.out.println("VERSION_2-Parameterized constructor");
        this.features=features;
        this.versionID=versionID;
        show(features);
        show(versionID);
    }

    //methods
    public void show(String features){
        System.out.println("Version2_Feature:"+features);
    }

    public void show(double versionID){
        System.out.println("Version2_ID:"+versionID);
    }
}
