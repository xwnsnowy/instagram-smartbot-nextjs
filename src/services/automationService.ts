"use server";

import { addKeyWord, addListener, addPost, addTrigger, createAutomation, deleteKeywordQuery, findAutomation, getAutomations, updateAutomation } from "@/actions/automations";
import { findUser } from "@/actions/users";
import { getCurrentUser } from "@/services/userService";
import { UpdateAutomationParams } from "@/types/automation";

export const createNewAutomation = async (id?: string) => {
  const user = await getCurrentUser();
  try {
    const create = await createAutomation({ clerkId: user.id, id });
    if (create) return { status: 200, data: "Automation created", res: create };

    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    console.error("createNewAutomation error:",
      error,
      user,
    );
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getAllAutomations = async () => {
  const user = await getCurrentUser();
  try {
    const automations = await getAutomations(user.id);
    if (automations)
      return {
        status: 200,
        data: automations.automations
      }
    return { status: 404, data: [] };
  } catch (error) {
    console.error("getAllAutomations error:",
      error,
      user,
    );
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  await getCurrentUser();

  try {
    const automation = await findAutomation(id);
    if (automation) {
      return { status: 200, data: automation };
    }
    return { status: 404, message: "Automation not found" };
  } catch (error) {
    console.error("getAutomationInfo error:",
      error,
    );
  } return { status: 500, message: "Internal Server Error" }
};

export const updateAutomationName = async (
  automationId: string,
  data: UpdateAutomationParams
) => {
  await getCurrentUser()
  try {
    const update = await updateAutomation(automationId, data)
    if (update) {
      return { status: 200, data: 'Automation successfully updated' }
    }
    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    console.error("updateAutomationName error:",
      error,
    );
  } return { status: 500, message: "Internal Server Error" }
};

export const saveListener = async (
  autmationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string
) => {
  await getCurrentUser()
  try {
    const create = await addListener(autmationId, listener, prompt, reply)
    if (create) return { status: 200, data: 'Listener created' }
    return { status: 404, data: 'Cant save listener' }
  } catch (error) {
    console.error("saveListener error:",
      error,
    );
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await getCurrentUser()
  try {
    const create = await addTrigger(automationId, trigger)
    if (create) return { status: 200, data: 'Trigger saved' }
    return { status: 404, data: 'Cannot save trigger' }
  } catch (error) {
    console.error("saveListener error:",
      error,
    );
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const saveKeyword = async (automationId: string, keyword: string) => {
  await getCurrentUser()
  try {
    const create = await addKeyWord(automationId, keyword)

    if (create) return { status: 200, data: 'Keyword added successfully' }

    return { status: 404, data: 'Cannot add this keyword' }
  } catch (error) {
    console.error("saveKeyword error:",
      error,
    );
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const deleteKeyword = async (id: string) => {
  await getCurrentUser();
  try {
    const deleted = await deleteKeywordQuery(id)
    if (deleted)
      return {
        status: 200,
        data: 'Keyword deleted',
      }
    return { status: 404, data: 'Keyword not found' }
  } catch (error) {
    console.error("deleteKeyword error:",
      error,
    );
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const getProfilePosts = async () => {
  const user = await getCurrentUser()
  try {
    const profile = await findUser(user.id)
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    )
    const parsed = await posts.json()
    if (parsed) return { status: 200, data: parsed }
    console.log('🔴 Error in getting posts')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 server side Error in getting posts ', error)
    return { status: 500 }
  }
}

export const savePosts = async (
  autmationId: string,
  posts: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }[]
) => {
  await getCurrentUser()
  try {
    const create = await addPost(autmationId, posts)

    if (create) return { status: 200, data: 'Posts attached' }

    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    console.log('🔴 server side Error in savePosts ', error)
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const activateAutomation = async (id: string, state: boolean) => {
  await getCurrentUser()
  try {
    const update = await updateAutomation(id, { active: state })
    if (update)
      return {
        status: 200,
        data: `Automation ${state ? 'activated' : 'disabled'}`,
      }
    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    console.log('🔴 server side Error in activateAutomation ', error)
    return { status: 500, data: 'Oops! something went wrong' }
  }
}