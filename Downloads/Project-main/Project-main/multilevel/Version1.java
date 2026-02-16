public class Version1 {
    protected  String versionName;
    protected int releaseYear;

    //default constructor
    public Version1(){
        System.out.println("VERSION_1-Default Constructor");
    }

    //parameterized constructor
    public Version1(String versionName, int releaseYear){
        System.out.println("VERSION_1-Parameterized constructor");
        this.versionName=versionName;
        this.releaseYear=releaseYear;
        display(versionName);
        display(releaseYear);
    }

    //methods
    public void display(String versionName){
        System.out.println("Version1_name:"+versionName);
    }

    public void display(int releaseYear){
        System.out.println("Version1_date:"+releaseYear);
    }
}
