<template>
    <Page>
        <ActionBar>
            <Label text="Vue.js Demo" />
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <StackLayout v-for="demo in demos" :key="demo.name">
                    <Button :text="demo.name" @tap="goToDemo(demo.component)" />
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import { demos } from '../../../demo-snippets/vue/install'
declare const demoRedirect: string;

export default {
    data() {
        return {
            demos
        };
    },
    mounted() {
        if (demoRedirect) {
            const Demo = demos.find(({ path }) => path === demoRedirect);
            if (Demo) {
                this.$navigateTo(Demo.component, {
                    animated: false
                });
            }
        }
    },
    methods: {
        goToDemo(component) {
            this.$navigateTo(component, {
                animated: true,
                transition: {
                    name: 'slideLeft',
                    duration: 200,
                    curve: 'ease'
                }
            });
        }
    }
};
</script>