import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Clipboard from "@react-native-clipboard/clipboard";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { QrCodeSvg } from "react-native-qr-svg";
import { useCameraDevice } from "react-native-vision-camera";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import RefreshIcon from "@/assets/icons/refresh.svg";
import ShareIcon from "@/assets/icons/share-right.svg";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Scanner } from "@/components/Scanner";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useFriendsStore } from "@/store/useFriendsStore";

type DialogActions = "regenerate-invite-code" | "scan-qr-code";

export default function AddFriendScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { user, regenerateInviteCode } = useAuthStore();
  const { addFriend } = useFriendsStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dialogAction, setDialogAction] = useState<DialogActions | null>(null);
  const [inviteCodeInputText, setInviteCodeInputText] = useState<string>("");
  const device = useCameraDevice("back");
  const IS_NATIVE_DIALOG_ADDED = false;

  const handleBottomSheetOpen = (action: DialogActions) => {
    setDialogAction(action);
    bottomSheetModalRef.current?.present();
  };

  const handleBottomSheetClose = () => {
    bottomSheetModalRef.current?.close();
    setDialogAction(null);
  };

  const handleTextChange = (text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, "");
    setInviteCodeInputText(formatCode(digitsOnly));
  };

  const onCodeWrite = (code: string) => {
    setInviteCodeInputText("");
    addFriend(code).catch((err) => {
      console.error("Error adding friend:", JSON.stringify(err));
    });
  };

  const onCodeScanned = (code: string) => {
    bottomSheetModalRef.current?.close();
    addFriend(code).catch((err) => {
      console.error("Error adding friend:", JSON.stringify(err));
    });
  };

  const formatCode = (code: string) => {
    return code
      .split(/(.{4})/)
      .filter(Boolean)
      .join(" ");
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="px-5" onPress={() => router.back()}>
          <ArrowLeft className="size-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white font-bold text-2xl text-center tracking-wide">
          Nawiąż znajomość
        </Text>
      ),
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#1E201E" },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);

  return (
    <View className="flex-1 bg-background p-6 items-center gap-5">
      <View className="w-full flex-row items-center gap-3">
        <Image
          source={{
            uri: user!.pictureUrl,
          }}
          className="size-16 rounded-lg"
        />
        <View>
          <Text className="text-white text-lg font-semibold">{user!.name}</Text>
          <Text className="text-white/50 text-md">Początkowy zbieracz</Text>
        </View>
      </View>
      <Spacer title="twój kod znajomego" />
      <View className="bg-white p-5 rounded-xl">
        <QrCodeSvg
          value={user!.inviteCode}
          backgroundColor="transparent"
          frameSize={240}
        />
      </View>
      <Text className="text-primary text-3xl font-bold">
        {formatCode(user!.inviteCode)}
      </Text>
      <View className="flex-row gap-4">
        <IconWrapper
          onPressAction={() => Clipboard.setString(user!.inviteCode)}
        >
          <CopyIcon width={20} height={20} />
        </IconWrapper>
        <IconWrapper
          onPressAction={() => handleBottomSheetOpen("regenerate-invite-code")}
        >
          <RefreshIcon width={20} height={20} />
        </IconWrapper>
        {IS_NATIVE_DIALOG_ADDED && (
          <IconWrapper onPressAction={() => {}}>
            <ShareIcon width={20} height={20} />
          </IconWrapper>
        )}
      </View>
      <Spacer title="dodaj znajomego" />
      <View className="flex-row w-full items-center gap-2 border-primary border rounded-2xl p-2">
        <Input
          className="flex-1 text-white/50 bg-background font-bold text-center border-background"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          inputMode="numeric"
          keyboardType="numeric"
          style={{
            fontSize: 20,
            marginTop: 5,
          }}
          value={inviteCodeInputText}
          onChangeText={handleTextChange}
        />
        {inviteCodeInputText.length === 0 && device ? (
          <IconWrapper
            onPressAction={() => handleBottomSheetOpen("scan-qr-code")}
          >
            <CameraIcon width={20} height={20} />
          </IconWrapper>
        ) : (
          <IconWrapper
            disabled={inviteCodeInputText.replace(/ /g, "").length < 16}
            onPressAction={() =>
              onCodeWrite(inviteCodeInputText.replace(/ /g, ""))
            }
          >
            <PlusIcon width={20} height={20} />
          </IconWrapper>
        )}
      </View>
      <BottomSheetModal
        handleIndicatorStyle={{
          backgroundColor: "#D9D9D9",
          width: 94,
          marginTop: 8,
          borderRadius: 4,
        }}
        backgroundStyle={{ backgroundColor: "#1E1E1E" }}
        ref={bottomSheetModalRef}
        enableDismissOnClose
        onDismiss={handleBottomSheetClose}
      >
        {dialogAction === "regenerate-invite-code" ? (
          <ConfirmDialog
            title="czy na pewno chcesz zresetować kod zaproszenia?"
            description="stary kod przestanie być aktualny."
            onDecline={handleBottomSheetClose}
            onConfirm={async () => {
              await regenerateInviteCode();
              handleBottomSheetClose();
            }}
            confirmContent={
              <>
                <Text className="text-white">Resetuj</Text>
                <RefreshIcon width={16} height={16} />
              </>
            }
          />
        ) : (
          <Scanner
            onCodeScanned={onCodeScanned}
            onRequestPermission={() => bottomSheetModalRef.current?.close()}
            device={device}
          />
        )}
      </BottomSheetModal>
    </View>
  );
}

const Spacer = ({ title }: { title: string }) => {
  return (
    <View className="w-full flex-row items-center">
      <View className="flex-1 h-1 bg-primary rounded-full" />
      <Text className="px-2 text-white">{title}</Text>
      <View className="flex-1 h-1 bg-primary rounded-full" />
    </View>
  );
};

const IconWrapper = ({
  children,
  onPressAction,
  disabled,
}: {
  children: React.ReactNode;
  onPressAction: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPressAction}
      className={cn(
        "bg-primary p-3 rounded-full h-12",
        disabled && "opacity-60",
      )}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};
