  export const WellDone = {
    id: 1,
    type: "success",
    icon: "fa-check-circle",
    title: "Well done!",
    message: "You successfully read this important message.",
  };

  export const HeadsUp = {
    id: 2,
    type: "info",
    icon: "fa-info-circle",
    title: "Heads up!",
    message: "This alert needs your attention, but it's not super important.",
  };

  export const Warning = {
    id: 3,  
    type: "warning",
    icon: "fa-exclamation-triangle",
    title: "Warning!",
    message: "Better check yourself, you're not looking too good.",
  };

  export const OhSnap = {
    id: 4,
    type: "danger",
    icon: "fa-times-circle",
    title: "Oh snap!",
  };

  export const PrimaryAlert = {
    id: 5,
    type: "primary",
    icon: "fa-thumbs-up",
    title: "Important Notice!",
    message: "Please make a selection before proceeding.",
  };

  export const alertData = [WellDone, HeadsUp, Warning, OhSnap, PrimaryAlert];

  export default alertData;
