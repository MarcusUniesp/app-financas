import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/Drawer";
import Home from "../pages/Home";

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
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
