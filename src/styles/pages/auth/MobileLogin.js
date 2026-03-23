import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    backgroundColor: "#ECFAE5",
    justifyContent: "center",
    alignItems: "center",
  },

  authCard: {
    width: "90%",
    maxWidth: 380, 
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",

    // Shadow (Android + iOS)
    elevation: 5,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
    color: "#333",
  },

  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },

  inputFocused: {
    borderColor: "#355E3B",
    shadowColor: "#355E3B",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },

  button: {
    width: "100%",
    backgroundColor: "#355E3B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },

  authLink: {
    marginTop: 15,
    color: "#355E3B",
    textDecorationLine: "underline",
  },
});

export default styles;
