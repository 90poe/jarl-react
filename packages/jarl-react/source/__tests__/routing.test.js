/* global describe test expect beforeEach */

import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import routing from "../routing";

import MockProvider from "./mocks/MockProvider";

configure({ adapter: new Adapter() });

describe("location", () => {
    let mockComponent;
    beforeEach(() => {
        mockComponent = () => <div />;
    });

    test("passes arbitrary location props to component", () => {
        const TestComponent = routing()(mockComponent);
        const mockState = { foo: Symbol("bar") };
        const output = mount(
            <MockProvider state={mockState}>
                <TestComponent />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.foo).toEqual(mockState.foo);
    });

    test("maps specific props", () => {
        const TestComponent = routing(({ foo }) => ({ baz: foo }))(
            mockComponent
        );
        const mockState = { foo: Symbol("bar") };
        const output = mount(
            <MockProvider state={mockState}>
                <TestComponent />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.foo).toEqual(undefined);
        expect(props.baz).toEqual(mockState.foo);
    });
});

describe("isActive", () => {
    let mockComponent;
    let routes;
    let TestComponent;
    beforeEach(() => {
        routes = [
            {
                // Home route
                path: "/",
                state: {
                    page: "home"
                },
                routes: [
                    {
                        path: "/child",
                        state: {
                            page: "child"
                        }
                    }
                ]
            },
            {
                // About route (sibling)
                path: "/about",
                state: {
                    page: "about"
                }
            },
            {
                path: "/product/:id",
                state: {
                    page: "product"
                },
                routes: [
                    {
                        path: "/details",
                        state: {
                            page: "details"
                        }
                    }
                ]
            }
        ];
        mockComponent = () => <div />;
        TestComponent = routing(null, ({ isActive }, { to }) => ({
            active: isActive(to)
        }))(mockComponent);
    });

    test("is active for home page", () => {
        const state = { page: "home" };
        const to = { page: "home" };
        const output = mount(
            <MockProvider state={state} routes={routes}>
                <TestComponent to={to} />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.active).toEqual(true);
    });

    test("is not active for sibling of home", () => {
        const state = { page: "about" };
        const to = { page: "home" };
        const output = mount(
            <MockProvider state={state} routes={routes}>
                <TestComponent to={to} />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.active).toEqual(false);
    });

    test("is active for child of home", () => {
        const state = { page: "child" };
        const to = { page: "home" };
        const output = mount(
            <MockProvider state={state} routes={routes}>
                <TestComponent to={to} />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.active).toEqual(true);
    });

    test("is not active for exact child of home", () => {
        TestComponent = routing(null, ({ isActive }, { to }) => ({
            active: isActive(to, true)
        }))(mockComponent);
        const state = { page: "child" };
        const to = { page: "home" };
        const output = mount(
            <MockProvider state={state} routes={routes}>
                <TestComponent to={to} />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.active).toEqual(false);
    });

    test("is not active for different state same route", () => {
        const state = { page: "product", id: "1" };
        const to = { page: "product", id: "2" };
        const output = mount(
            <MockProvider state={state} routes={routes}>
                <TestComponent to={to} />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.active).toEqual(false);
    });

    test("is active for same state same branch", () => {
        const state = { page: "details", id: "1" };
        const to = { page: "product", id: "1" };
        const output = mount(
            <MockProvider state={state} routes={routes}>
                <TestComponent to={to} />
            </MockProvider>
        );
        const test = output.find(mockComponent);
        const props = test.props();
        expect(props.active).toEqual(true);
    });
});
