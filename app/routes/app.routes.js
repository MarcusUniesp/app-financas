import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/Drawer";
import Home from "../pages/Home";
import Register from "../pages/Register";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Minhas movimentações", drawerLabel: "Home" }}
      />
      <AppDrawer.Screen
        name="Register"
        component={Register}
        options={{ title: "Registrando", drawerLabel: "Registrar" }}
      />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
