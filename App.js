import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Screens
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import BudgetCalendar from "./screens/BudgetCalendar";
import BudgetWeek from "./screens/BudgetWeek";
import ManageAddBudgetCalendar from "./screens/ManageAddBudgetCalendar";
import ManageOtherBudgetCalendar from "./screens/ManageOtherBudgetCalendar";
import BudgetWeekAdd from "./screens/BudgetWeekAdd";
import Login from "./screens/Login";
import SignIn from "./screens/SignIn";
//Decoration and Context API
import { GlobalStyles } from "./constants/style";
import { Ionicons, SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expense-context";

//Create the constant of the stack and the botton tab
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          //marginBottom: 10,
          //marginTop: 10,
          marginLeft: 5,
          marginRight: 5,
          paddingBottom: 10,
          paddingTop: 5,
          position: "absolute",
          height: 72,
          borderTopColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add-circle"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="power-outline"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          headerTitleAlign: "center",
        }}
      />
      <BottomTab.Screen
        name="AllExpences"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="wallet" color={color} size={size} />
          ),
          headerTitleAlign: "center",
        }}
      />

      <BottomTab.Screen
        name="BudgetCalendar"
        component={BudgetCalendar}
        options={{
          title: "Budget Calendar",
          tabBarLabel: "Budget Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
      />
      <BottomTab.Screen
        name="BudgetWeek"
        component={BudgetWeek}
        options={{
          title: "Budget Week",
          tabBarLabel: "Budget Week",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="coins" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="ManageAddBudgetCalendar"
              component={ManageAddBudgetCalendar}
              options={{
                presentation: "modal",
                title: "Add Payment",
              }}
            />
            <Stack.Screen
              name="ManageOtherBudgetCalendar"
              component={ManageOtherBudgetCalendar}
              options={{
                presentation: "modal",
              }}
            />

            <Stack.Screen
              name="BudgetWeekAdd"
              component={BudgetWeekAdd}
              options={{ presentation: "modal", title: "" }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
